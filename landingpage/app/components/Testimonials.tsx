export default function Testimonials() {
  const testimonials = [
    {
      name: "田中 智也",
      role: "フロントエンドエンジニア",
      company: "株式会社WebTech",
      content: "Claude Code講座を受講してから、開発効率が3倍になりました。特にAIを活用したコード生成とレビューの手法が実務でとても役立っています。",
      avatar: "👨‍💻",
      rating: 5
    },
    {
      name: "佐藤 美咲",
      role: "プロダクトマネージャー",
      company: "スタートアップA",
      content: "技術的な知識がなくても、Claude Codeの活用方法を理解できました。開発チームとのコミュニケーションが格段に向上しました。",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "山田 雄一",
      role: "バックエンドエンジニア",
      company: "フリーランス",
      content: "実践的なプロジェクトを通して学べるので、すぐに仕事に活かせました。メンタリングも充実していて、確実にスキルアップできます。",
      avatar: "👨‍🔧",
      rating: 5
    },
    {
      name: "高橋 麗子",
      role: "UI/UXデザイナー",
      company: "デザイン会社B",
      content: "デザイナーでもClaude Codeを使ってプロトタイプを作れるようになりました。デザインと開発の橋渡しができて、業務の幅が広がりました。",
      avatar: "👩‍🎨",
      rating: 4
    },
    {
      name: "鈴木 健太",
      role: "データサイエンティスト",
      company: "AI企業C",
      content: "AIを使った開発は今後必須のスキルだと思います。この講座で基礎から応用まで体系的に学べて、キャリアの選択肢が大幅に増えました。",
      avatar: "👨‍🔬",
      rating: 5
    },
    {
      name: "渡辺 花子",
      role: "プログラミング初心者",
      company: "転職活動中",
      content: "プログラミング未経験からスタートしましたが、段階的なカリキュラムのおかげで無理なく学習できました。現在は内定をいただいています！",
      avatar: "👩‍🎓",
      rating: 5
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ⭐
      </span>
    ))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            受講生の声
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Claude Code講座を受講された方々からいただいた
            リアルな体験談をご紹介します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              受講生満足度
            </h3>
            <div className="flex justify-center items-center gap-8 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">総合満足度</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-600">スキルアップ実感</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">92%</div>
                <div className="text-gray-600">転職・昇進成功</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              ※2024年受講生アンケート結果（回答数: 324名）
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}