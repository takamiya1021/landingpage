# Vibe Deploy 統合Makefile

# vibe-deployへのパス（絶対パス）
VIBE_DEPLOY_PATH := $(shell cd ../vibe-deploy 2>/dev/null && pwd || echo "")

# プロジェクトのパス
PROJECT_PATH := $(shell pwd)

# vibe-deployの存在確認
.PHONY: check-vibe-deploy
check-vibe-deploy:
	@if [ -z "$(VIBE_DEPLOY_PATH)" ] || [ ! -d "../vibe-deploy" ]; then \
		echo "$(RED)✗ vibe-deployが見つかりません$(NC)"; \
		echo ""; \
		echo "$(YELLOW)vibe-deployをダウンロードする必要があります:$(NC)"; \
		echo ""; \
		echo "  1. 以下のURLにアクセス:"; \
		echo "     https://vibe-products.vercel.app/templates"; \
		echo ""; \
		echo "  2. 'Vibe Deploy'を探してダウンロード"; \
		echo ""; \
		echo "  3. ダウンロードしたzipファイルを展開して同階層に配置:"; \
		echo "     フォルダ"; \
		echo "     ├── vibe-deploy/"; \
		echo "     └── vibe-{product}/"; \
		echo ""; \
		echo "  4. 再度コマンドを実行:"; \
		echo "     $$ make deploy"; \
		echo ""; \
		exit 1; \
	fi

# 設定ファイル
CONFIG_FILE := deploy.conf

# appディレクトリの存在確認とパス設定
APP_DIR := app

# カラー定義
GREEN := \033[0;32m
YELLOW := \033[1;33m
CYAN := \033[0;36m
RED := \033[0;31m
NC := \033[0m


# デフォルトターゲット
.PHONY: help
help:
	@echo "$(CYAN)Vibe Preview - 利用可能なコマンド:$(NC)"
	@echo ""
	@echo "$(GREEN)基本コマンド:$(NC)"
	@echo "  make setup        初期セットアップ"
	@echo "  make start        開発サーバーを起動してブラウザで開く"
	@echo "  make stop         開発サーバーを停止"
	@echo "  make clean        ビルドファイルをクリーンアップ"
	@echo "  make deploy       プロダクションにデプロイ"
	@echo ""
	@echo ""
	@echo "$(CYAN)オプション:$(NC)"
	@echo "  FORCE=1          確認をスキップ"
	@echo "  PROVIDER=vercel  プロバイダーを上書き"
	@echo "  PORT=3001        ポート番号を指定"
	@echo ""

# セットアップ
.PHONY: setup
setup:
	@echo "$(CYAN)▶ vibe-preview のセットアップを開始します$(NC)"
	@echo "$(YELLOW)▶ 自動生成ファイルをクリーンアップ...$(NC)"
	@cd $(APP_DIR) && rm -rf .firebase .firebaserc pglite-debug.log
	@echo "$(YELLOW)▶ Firebase CLI をグローバルインストール...$(NC)"
	@npm install -g firebase-tools 2>/dev/null || echo "$(YELLOW)⚠ Firebase CLI は既にインストールされています$(NC)"
	@echo "$(GREEN)✅ vibe-preview のセットアップが完了しました！$(NC)"
	@echo "$(CYAN)ℹ️  このプロジェクトはNode.jsに依存しません$(NC)"

# 開発サーバー起動（ブラウザで開く）
.PHONY: start
start:
	@echo "$(CYAN)▶ 開発サーバーを起動してブラウザで開きます...$(NC)"
	@PORT=$${PORT:-3000}; \
	echo "$(CYAN)📍 URL: http://localhost:$$PORT$(NC)"; \
	sleep 1 && \
	open http://localhost:$$PORT & \
	cd $(APP_DIR) && npx serve . -p $$PORT

# 開発サーバー停止
.PHONY: stop
stop:
	@echo "$(YELLOW)▶ 開発サーバーを停止中...$(NC)"
	@-pkill -f "serve \." 2>/dev/null || true
	@echo "$(GREEN)✓ 開発サーバーが停止しました$(NC)"

# クリーンアップ
.PHONY: clean
clean:
	@echo "$(YELLOW)▶ クリーンアップ中...$(NC)"
	@cd $(APP_DIR) && rm -rf .firebase .firebaserc firebase-debug.log pglite-debug.log
	@echo "$(GREEN)✓ クリーンアップ完了$(NC)"

# デプロイ
.PHONY: deploy
deploy: check-vibe-deploy
	@echo "$(CYAN)▶ プロジェクトをデプロイ中...$(NC)"
	@$(VIBE_DEPLOY_PATH)/scripts/deploy.sh \
		--project $(PROJECT_PATH) \
		--config $(CONFIG_FILE) \
		$(if $(FORCE),--force) \
		$(if $(PROVIDER),--provider $(PROVIDER)) \
		$(if $(KEEP_TEMP),--keep-temp)

