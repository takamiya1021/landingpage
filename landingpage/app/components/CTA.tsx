'use client'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
      <div className="container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            今すぐ始めて、
            <span className="block text-yellow-300">未来の開発者になろう</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Claude Codeを使ったAI開発の世界へ踏み出そう。
            <br className="hidden md:block" />
            あなたの開発効率を革命的に向上させる12週間が始まります。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="bg-white text-blue-900 px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105">
              今すぐ申し込む
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-xl hover:bg-white hover:text-blue-900 transition-colors">
              無料説明会に参加
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold mb-2">実践的スキル習得</h3>
              <p>理論だけでなく、実際のプロジェクトで使えるスキルを身につける</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold mb-2">開発効率3倍アップ</h3>
              <p>AI支援開発により、従来の3倍の速度で高品質なコードを作成</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold mb-2">キャリアアップ</h3>
              <p>最新のAI技術を活用できる開発者として市場価値を向上</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">🎁 今なら特別特典</h3>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>早期申し込み割引: 10,000円OFF</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>Claude Code活用テンプレート集（非売品）</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                <span>個別相談会への無料参加権</span>
              </li>
            </ul>
            <p className="text-sm opacity-90">
              ※特典は先着50名様限定です（残り23名）
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg mb-2">申し込み締切まで</p>
            <div className="flex justify-center gap-4 text-3xl font-bold">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <div>07</div>
                <div className="text-sm font-normal">日</div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <div>14</div>
                <div className="text-sm font-normal">時間</div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <div>32</div>
                <div className="text-sm font-normal">分</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}