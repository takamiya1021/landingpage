import SectionHeading from '../ui/SectionHeading'
import Container from '../ui/Container'
import Card, { CardContent } from '../ui/Card'

interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

const features: Feature[] = [
  {
    title: "Claude Codeマスタリー",
    description: "Claude Codeの基本操作から高度な活用法まで、体系的に学習できます",
    icon: "🤖",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "実践的プロジェクト",
    description: "実際のWebアプリケーション開発を通して、実務で使えるスキルを身につけます",
    icon: "🚀",
    color: "from-purple-400 to-purple-600"
  },
  {
    title: "AI開発効率化",
    description: "AI支援による開発効率化のテクニックとベストプラクティスを習得",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "コードレビュー",
    description: "専門講師によるコードレビューで、品質の高いコードの書き方を学習",
    icon: "👨‍💻",
    color: "from-green-400 to-green-600"
  },
  {
    title: "最新技術対応",
    description: "常に最新のClaude Codeアップデートに対応したカリキュラムを提供",
    icon: "🔄",
    color: "from-cyan-400 to-cyan-600"
  },
  {
    title: "コミュニティ",
    description: "受講生同士の交流や情報共有ができる専用コミュニティに参加可能",
    icon: "👥",
    color: "from-pink-400 to-pink-600"
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <SectionHeading
          title="講座の特徴"
          subtitle="Claude Code講座では、実践的なスキルを身につけるための充実したカリキュラムと学習環境を提供します"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} gradient hover className="group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}