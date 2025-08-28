'use client'

export default function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center text-white relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Claude Code講座
          <span className="block text-cyan-300">AI開発の未来を学ぼう</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
          Claude Codeを使って効率的なAI開発を学べる実践的な講座です。
          <br />
          初心者から上級者まで、段階的にスキルアップできるカリキュラムを提供します。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            今すぐ申し込む
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors">
            詳細を見る
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-semibold mb-2">実践重視</h3>
            <p className="text-lg">理論だけでなく、実際のプロジェクトを通して学習</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-semibold mb-2">段階的学習</h3>
            <p className="text-lg">基礎から応用まで、自分のペースで進められる</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-2xl font-semibold mb-2">充実サポート</h3>
            <p className="text-lg">質問対応とコードレビューで確実にスキルアップ</p>
          </div>
        </div>
      </div>
      
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}