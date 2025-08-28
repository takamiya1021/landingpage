export default function Features() {
  const features = [
    {
      title: "Claude Codeマスタリー",
      description: "Claude Codeの基本操作から高度な活用法まで、体系的に学習できます",
      icon: "🤖"
    },
    {
      title: "実践的プロジェクト",
      description: "実際のWebアプリケーション開発を通して、実務で使えるスキルを身につけます",
      icon: "🚀"
    },
    {
      title: "AI開発効率化",
      description: "AI支援による開発効率化のテクニックとベストプラクティスを習得",
      icon: "⚡"
    },
    {
      title: "コードレビュー",
      description: "専門講師によるコードレビューで、品質の高いコードの書き方を学習",
      icon: "👨‍💻"
    },
    {
      title: "最新技術対応",
      description: "常に最新のClaude Codeアップデートに対応したカリキュラムを提供",
      icon: "🔄"
    },
    {
      title: "コミュニティ",
      description: "受講生同士の交流や情報共有ができる専用コミュニティに参加可能",
      icon: "👥"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            講座の特徴
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Claude Code講座では、実践的なスキルを身につけるための
            充実したカリキュラムと学習環境を提供します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}