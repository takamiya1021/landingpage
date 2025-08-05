// QRコード生成ツールのメインスクリプト

// DOM要素の取得
const urlInput = document.getElementById('url-input');
const sizeSelect = document.getElementById('size-select');
const colorInput = document.getElementById('color-input');
const bgColorInput = document.getElementById('bg-color-input');
const errorCorrectionSelect = document.getElementById('error-correction');
const generateBtn = document.getElementById('generate-btn');
const resultSection = document.getElementById('result-section');
const qrcodeDiv = document.getElementById('qrcode');
const encodedUrlSpan = document.getElementById('encoded-url');
const downloadBtn = document.getElementById('download-png-btn');
const copyUrlBtn = document.getElementById('copy-url-btn');
const newQrBtn = document.getElementById('new-qr-btn');
const historyList = document.getElementById('history-list');

// QRCode インスタンス
let qrcode = null;

// 履歴の最大保存数
const MAX_HISTORY = 10;

// ローカルストレージのキー
const HISTORY_KEY = 'qrcode-history';

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    
    // URLの自動選択
    urlInput.addEventListener('focus', (e) => {
        if (e.target.value === 'https://') {
            e.target.select();
        }
    });
    
    // Enterキーでも生成
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
});

// イベントリスナーの設定
generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQRCode);
copyUrlBtn.addEventListener('click', copyUrl);
newQrBtn.addEventListener('click', resetForm);

// オプション変更時の再生成
sizeSelect.addEventListener('change', () => {
    if (qrcode) regenerateQRCode();
});
colorInput.addEventListener('change', () => {
    if (qrcode) regenerateQRCode();
});
bgColorInput.addEventListener('change', () => {
    if (qrcode) regenerateQRCode();
});
errorCorrectionSelect.addEventListener('change', () => {
    if (qrcode) regenerateQRCode();
});

// QRコード生成
function generateQRCode() {
    const url = urlInput.value.trim();
    
    // URLのバリデーション
    if (!url || url === 'https://') {
        showError('URLを入力してください');
        return;
    }
    
    try {
        new URL(url); // URL形式のチェック
    } catch (e) {
        showError('有効なURLを入力してください');
        return;
    }
    
    // QRコードを生成
    createQRCode(url);
    
    // 履歴に追加
    addToHistory(url);
    
    // 結果セクションを表示
    resultSection.style.display = 'block';
    encodedUrlSpan.textContent = url;
    
    // 生成ボタンのテキストを変更
    generateBtn.textContent = 'QRコードを再生成';
    
    // スクロール
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// QRコードの作成
function createQRCode(text) {
    const size = parseInt(sizeSelect.value);
    const colorDark = colorInput.value;
    const colorLight = bgColorInput.value;
    const correctLevel = getCorrectLevel(errorCorrectionSelect.value);
    
    // 既存のQRコードをクリア
    qrcodeDiv.innerHTML = '';
    
    // 新しいQRコードを生成
    qrcode = new QRCode(qrcodeDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: correctLevel
    });
}

// 誤り訂正レベルの取得
function getCorrectLevel(level) {
    const levels = {
        'L': QRCode.CorrectLevel.L,
        'M': QRCode.CorrectLevel.M,
        'Q': QRCode.CorrectLevel.Q,
        'H': QRCode.CorrectLevel.H
    };
    return levels[level] || QRCode.CorrectLevel.M;
}

// QRコードの再生成
function regenerateQRCode() {
    const url = urlInput.value.trim();
    if (url && url !== 'https://') {
        createQRCode(url);
    }
}

// QRコードのダウンロード
function downloadQRCode() {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (!canvas) return;
    
    // canvasをBlobに変換
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qrcode_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showSuccess('QRコードをダウンロードしました');
    });
}

// URLのコピー
function copyUrl() {
    const url = urlInput.value.trim();
    navigator.clipboard.writeText(url).then(() => {
        showSuccess('URLをクリップボードにコピーしました');
    }).catch(() => {
        showError('コピーに失敗しました');
    });
}

// フォームのリセット
function resetForm() {
    urlInput.value = 'https://';
    resultSection.style.display = 'none';
    generateBtn.textContent = 'QRコードを生成';
    qrcode = null;
    urlInput.focus();
}

// 履歴の追加
function addToHistory(url) {
    let history = getHistory();
    
    // 既存の同じURLを削除
    history = history.filter(item => item.url !== url);
    
    // 新しいアイテムを先頭に追加
    history.unshift({
        url: url,
        timestamp: Date.now()
    });
    
    // 最大数を超えた場合は古いものを削除
    if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
    }
    
    // 保存
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    
    // 表示を更新
    displayHistory(history);
}

// 履歴の取得
function getHistory() {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

// 履歴の読み込みと表示
function loadHistory() {
    const history = getHistory();
    displayHistory(history);
}

// 履歴の表示
function displayHistory(history) {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-message">まだQRコードを生成していません</p>';
        return;
    }
    
    historyList.innerHTML = history.map(item => {
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString('ja-JP', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `
            <div class="history-item" data-url="${escapeHtml(item.url)}">
                <div class="history-url">${escapeHtml(truncateUrl(item.url))}</div>
                <div class="history-date">${dateStr}</div>
                <button class="history-use-btn" onclick="useHistoryUrl('${escapeHtml(item.url)}')">
                    使用
                </button>
            </div>
        `;
    }).join('');
}

// 履歴のURLを使用
function useHistoryUrl(url) {
    urlInput.value = url;
    generateQRCode();
}

// URLの切り詰め
function truncateUrl(url, maxLength = 50) {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 成功メッセージの表示
function showSuccess(message) {
    showNotification(message, 'success');
}

// エラーメッセージの表示
function showError(message) {
    showNotification(message, 'error');
}

// 通知の表示
function showNotification(message, type) {
    // 既存の通知を削除
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // アニメーション開始
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒後に削除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}