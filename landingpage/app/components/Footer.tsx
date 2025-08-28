export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Claude Code講座</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              AI開発の未来を学び、効率的な開発スキルを身につける実践的な講座です。
              初心者から上級者まで、あなたのレベルに合わせた学習環境を提供します。
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                📧
              </a>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                🐦
              </a>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                📺
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">講座について</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">カリキュラム</a></li>
              <li><a href="#" className="hover:text-white transition-colors">料金プラン</a></li>
              <li><a href="#" className="hover:text-white transition-colors">受講生の声</a></li>
              <li><a href="#" className="hover:text-white transition-colors">よくある質問</a></li>
              <li><a href="#" className="hover:text-white transition-colors">無料説明会</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">サポート</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">技術サポート</a></li>
              <li><a href="#" className="hover:text-white transition-colors">返金ポリシー</a></li>
              <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
              <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © 2024 Claude Code講座. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <span>📞 03-1234-5678</span>
              <span>📧 info@claude-code-course.com</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold mb-2">📧 メールニュースレター</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Claude Codeの最新情報や開発Tips、限定セミナー情報をお届けします
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="メールアドレスを入力"
                className="flex-1 px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold transition-colors">
                購読
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}