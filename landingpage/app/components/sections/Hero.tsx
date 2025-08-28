'use client'

import Button from '../ui/Button'
import Container from '../ui/Container'
import Card from '../ui/Card'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      <Container className="relative z-10 min-h-screen flex items-center">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold text-blue-200">✨ AI開発の新時代</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Claude Code講座
              </span>
              <br />
              <span className="text-4xl md:text-6xl text-cyan-300 font-bold">
                AI開発の未来を学ぼう
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-12 max-w-5xl mx-auto leading-relaxed text-gray-300">
            Claude Codeを使って効率的なAI開発を学べる実践的な講座です。
            <br />
            初心者から上級者まで、段階的にスキルアップできるカリキュラムを提供します。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button variant="primary" size="xl" className="shadow-2xl">
              🚀 今すぐ申し込む
            </Button>
            <Button variant="outline" size="xl">
              📖 詳細を見る
            </Button>
          </div>

          {/* Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-white">実践重視</h3>
              <p className="text-gray-300 leading-relaxed">
                理論だけでなく、実際のプロジェクトを通して学習
              </p>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 md:transform md:scale-110">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-4 text-white">段階的学習</h3>
              <p className="text-gray-300 leading-relaxed">
                基礎から応用まで、自分のペースで進められる
              </p>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-white">充実サポート</h3>
              <p className="text-gray-300 leading-relaxed">
                質問対応とコードレビューで確実にスキルアップ
              </p>
            </Card>
          </div>
        </div>
      </Container>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}