import SectionHeading from '../ui/SectionHeading'
import Container from '../ui/Container'
import Card, { CardContent } from '../ui/Card'
import Badge from '../ui/Badge'

interface Module {
  number: string
  title: string
  duration: string
  topics: string[]
  color: string
}

const modules: Module[] = [
  {
    number: "01",
    title: "Claude Code基礎",
    duration: "2週間",
    color: "from-blue-500 to-cyan-500",
    topics: [
      "Claude Codeのインストールとセットアップ",
      "基本的なコマンドと操作方法",
      "プロジェクト管理の基本",
      "効率的なワークフロー構築"
    ]
  },
  {
    number: "02", 
    title: "AI支援開発実践",
    duration: "3週間",
    color: "from-purple-500 to-pink-500",
    topics: [
      "AIを活用したコード生成",
      "デバッグとトラブルシューティング",
      "コードレビューとリファクタリング",
      "テスト駆動開発との組み合わせ"
    ]
  },
  {
    number: "03",
    title: "Webアプリケーション開発",
    duration: "4週間", 
    color: "from-green-500 to-teal-500",
    topics: [
      "React/Next.jsプロジェクトの構築",
      "API設計と実装",
      "データベース連携",
      "デプロイメント戦略"
    ]
  },
  {
    number: "04",
    title: "高度な活用法",
    duration: "3週間",
    color: "from-orange-500 to-red-500",
    topics: [
      "カスタムワークフローの構築",
      "チーム開発での活用",
      "CI/CDパイプラインとの統合",
      "パフォーマンス最適化"
    ]
  }
]

export default function CourseContent() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          title="学習カリキュラム"
          subtitle="12週間のカリキュラムで、Claude Codeを使った効率的な開発スキルを段階的に習得していきます"
        />

        <div className="space-y-8">
          {modules.map((module, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                {/* Module Header */}
                <div className="lg:w-1/3 p-8">
                  <div className={`bg-gradient-to-r ${module.color} text-white rounded-3xl p-8 transform group-hover:scale-105 transition-transform duration-300`}>
                    <Badge variant="gradient" className="bg-white/20 text-white mb-4">
                      Module {module.number}
                    </Badge>
                    <h3 className="text-3xl font-bold mb-4">{module.title}</h3>
                    <div className="flex items-center text-white/90">
                      <span className="text-lg">📅 期間: {module.duration}</span>
                    </div>
                  </div>
                </div>
                
                {/* Module Content */}
                <div className="lg:w-2/3 p-8 flex items-center">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">📚</span>
                      学習内容
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {module.topics.map((topic, topicIndex) => (
                        <div 
                          key={topicIndex}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Post-completion Support */}
        <div className="mt-16">
          <Card gradient className="max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-6">🎓</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                修了後のサポート
              </h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                講座修了後も6ヶ月間のフォローアップサポートを提供。
                質問対応やキャリア相談も可能です。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="info" size="lg">📧 メールサポート</Badge>
                <Badge variant="success" size="lg">💬 コミュニティアクセス</Badge>
                <Badge variant="warning" size="lg">🎯 キャリア相談</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}