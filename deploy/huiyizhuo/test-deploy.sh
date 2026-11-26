#!/usr/bin/env bash
set -euo pipefail
source_dir=$(cd "$(dirname "$0")" && pwd)
workspace=$(mktemp -d /tmp/huiyizhuo-deploy-test.XXXXXXXX)
trap 'rm -rf -- "$workspace"' EXIT
old_image="ghcr.io/pixcook-ai/litellm-huiyizhuo@sha256:$(printf 'a%.0s' {1..64})"
new_image="ghcr.io/pixcook-ai/litellm-huiyizhuo@sha256:$(printf 'b%.0s' {1..64})"
mkdir -p "$workspace/bin" "$workspace/opt/preview"
sed "s|^base=/opt/huiyizhuo$|base=$workspace/opt|" "$source_dir/deploy" > "$workspace/deploy"
cp "$source_dir/compose.yaml" "$source_dir/config.yaml" "$workspace/opt/"
printf 'PRESERVED_SECRET=kept
' > "$workspace/opt/preview/.env"
printf 'IMAGE=%s
' "$old_image" > "$workspace/opt/preview/release.env"
cat > "$workspace/bin/docker" <<'MOCK'
#!/usr/bin/env bash
set -eu
printf '%s
' "$*" >> "$TEST_DIR/commands.log"
case " $* " in
  *" pg_dump "*) printf 'backup';;
  *" psql "*) printf '1
';;
  *" up -d --wait --wait-timeout 600 "*)
    if [[ -f $TEST_DIR/fail ]]; then exit 1; fi;;
esac
MOCK
cat > "$workspace/bin/curl" <<'MOCK'
#!/usr/bin/env bash
printf '%s
' '{"status":"healthy","db":"connected"}'
MOCK
chmod +x "$workspace/bin/docker" "$workspace/bin/curl"
printf '#!/usr/bin/env bash\nexit 0\n' > "$workspace/bin/flock"
chmod +x "$workspace/bin/flock"
export TEST_DIR=$workspace
export PATH="$workspace/bin:$PATH"
if bash "$workspace/deploy" preview 'alpine:latest' > /dev/null 2>&1; then
  echo 'Untrusted image was accepted' >&2; exit 1
fi
if SSH_ORIGINAL_COMMAND="deploy production $new_image" bash "$source_dir/ssh-deploy" preview > /dev/null 2>&1; then
  echo 'Cross-environment SSH command was accepted' >&2; exit 1
fi
if SSH_ORIGINAL_COMMAND="deploy preview $new_image; touch /tmp/invalid" bash "$source_dir/ssh-deploy" preview > /dev/null 2>&1; then
  echo 'SSH command injection was accepted' >&2; exit 1
fi
touch "$workspace/fail"
if bash "$workspace/deploy" preview "$new_image" > /dev/null 2>&1; then
  echo 'Failed deployment was reported as successful' >&2; exit 1
fi
grep -qx "IMAGE=$old_image" "$workspace/opt/preview/release.env"
grep -q 'up -d --no-deps --wait --wait-timeout 300 app' "$workspace/commands.log"
[[ $(find "$workspace/opt/preview/backups" -name '*.dump' | wc -l) -eq 1 ]]
grep -qx PRESERVED_SECRET=kept "$workspace/opt/preview/.env"
rm "$workspace/fail"
bash "$workspace/deploy" preview "$new_image" > /dev/null
grep -qx "IMAGE=$new_image" "$workspace/opt/preview/release.env"
grep -q "$new_image" "$workspace/opt/preview/releases.log"
echo 'Deployment validation, database backup, failed release rollback and successful release passed.'
