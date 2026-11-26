# 汇一桌部署

品牌分支为 litellm_huiyizhuo。部署配置集中在本目录，继续使用上游 runtime 镜像和迁移入口。GitHub Actions 构建一次，先部署预览，通过后将同一镜像摘要部署生产。

## 首次安装

将 deploy、ssh-deploy 安装为服务器 /opt/huiyizhuo/ 下 root 所有、权限 755 的文件。将 compose.yaml、config.yaml 安装到同目录，权限 600。目录权限 700。服务器需要 Bash、Docker Compose v2.24 或以上、Python 3、curl、openssl 和 flock。

第一次部署会分别创建 preview、production 目录及权限 600 的 .env。两个环境使用不同数据库、Redis、持久卷、管理员密码、主密钥和加密盐。管理员用户名为 admin，密码保存在对应 .env 的 UI_PASSWORD 字段，不出现在部署日志中。请通过安全渠道保存密码。主密钥、加密盐和数据库密码须持久保留，备份数据库时同时备份 .env。

首次拉取 PostgreSQL 16 和 Redis 7 后，将具体镜像摘要写入 .env，后续部署复用。更新基础设施镜像时先备份、验证兼容性，再手动修改摘要。

## 部署接口

直接部署使用以下形式，镜像必须来自指定 GHCR 包并带完整 SHA-256 摘要。

    /opt/huiyizhuo/deploy preview ghcr.io/pixcook-ai/litellm-huiyizhuo@sha256:<64 位十六进制摘要>

私有镜像可附加 GitHub 用户名，将临时 packages:read 令牌作为 stdin 唯一一行传入。令牌只写入临时 Docker 配置，退出时删除。

    deploy preview <完整镜像摘要> <github_actor>

GitHub 的 preview、production 环境各使用一对独立部署密钥。对应公钥写入 root 的 authorized_keys，并设置 restrict 以及固定命令 /opt/huiyizhuo/ssh-deploy preview 或 /opt/huiyizhuo/ssh-deploy production。wrapper 检查环境、镜像和用户名，拒绝其他命令及参数。服务器主机公钥须事先核实并存入工作流 HUIYIZHUO_SSH_KNOWN_HOSTS。GitHub 环境变量为 HUIYIZHUO_SSH_HOST、HUIYIZHUO_SSH_USER、可选 HUIYIZHUO_SSH_PORT，密钥为 HUIYIZHUO_SSH_KEY、HUIYIZHUO_SSH_KNOWN_HOSTS。

预览监听 127.0.0.1:18401，生产监听 127.0.0.1:18400。通过 Nginx 分别代理 preview.huiyizhuo.com 和 huiyizhuo.com，配置 HTTPS。数据库及 Redis 仅在各自 Compose 网络内监听。修改每套环境的 config.yaml 配置供应商路由，模型也可通过管理界面持久化。仓库模板只在 config.yaml 不存在时复制，保留运营配置。

## 检查与回退

部署使用宿主 flock 串行锁。替换应用前拉取镜像，并在环境的 backups 目录创建 PostgreSQL 自定义格式备份。停止的数据库会先启动并检查后再备份。已有应用仍可在数据库备份期间处理请求。

新应用启动时执行上游迁移。部署等待 Compose 健康检查，再检查 PostgreSQL SELECT 1 和 /health/readiness 的 healthy、connected 状态。只有全部通过才返回成功，并在 releases.log 中记录时间及镜像摘要。

升级失败会重新启动上一个镜像，并返回失败。数据库迁移及期间新增数据保留，脚本不恢复数据库备份或执行降级迁移。若新旧 schema 不兼容，旧镜像可能仍无法运行，需要根据实际迁移修复后前向发布。首次部署没有旧镜像，失败时保留现场和凭据供排查。数据库恢复需要单独核对备份时点与后续数据，再按运维流程处理。

服务器部署脚本与 Compose 模板由本目录发布，修改后需要更新服务器 /opt/huiyizhuo/ 中对应文件。工作流每次部署的是应用镜像，不会自动覆盖宿主部署脚本。升级数据库、迁移生产数据或变更运营配置需按具体变更验证。

## 本地检查

    bash -n deploy/huiyizhuo/deploy deploy/huiyizhuo/ssh-deploy
    shellcheck deploy/huiyizhuo/deploy deploy/huiyizhuo/ssh-deploy deploy/huiyizhuo/test-deploy.sh
    bash deploy/huiyizhuo/test-deploy.sh

实际部署后还需验证两个 HTTPS 域名、管理员登录、退出后重新登录、中文与品牌资源，以及运行镜像摘要。SSO 和其他外部集成各需真实配置与验收。
