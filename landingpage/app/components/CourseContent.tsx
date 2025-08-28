export default function CourseContent() {
  const modules = [
    {
      number: "01",
      title: "Claude Code基礎",
      duration: "2週間",
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
      topics: [
        "カスタムワークフローの構築",
        "チーム開発での活用",
        "CI/CDパイプラインとの統合",
        "パフォーマンス最適化"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            学習カリキュラム
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            12週間のカリキュラムで、Claude Codeを使った
            効率的な開発スキルを段階的に習得していきます
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0"
            >
              <div className="md:w-1/3">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg p-6">
                  <div className="text-sm font-semibold opacity-90 mb-2">
                    Module {module.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{module.title}</h3>
                  <div className="text-sm opacity-90">期間: {module.duration}</div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="bg-gray-50 rounded-lg p-6 h-full">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    学習内容
                  </h4>
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li 
                        key={topicIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              修了後のサポート
            </h3>
            <p className="text-gray-700 mb-4">
              講座修了後も6ヶ月間のフォローアップサポートを提供。
              質問対応やキャリア相談も可能です。
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <span>📧 メールサポート</span>
              <span>💬 コミュニティアクセス</span>
              <span>🎯 キャリア相談</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}