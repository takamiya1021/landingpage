'use client'

export default function Pricing() {
  const plans = [
    {
      name: "基礎コース",
      price: "49,800",
      duration: "6週間",
      description: "Claude Codeの基本操作を学びたい方向け",
      features: [
        "基礎モジュール（Module 01-02）",
        "オンライン動画講義",
        "課題フィードバック",
        "質問サポート（平日対応）",
        "修了証明書"
      ],
      popular: false,
      buttonText: "基礎コースを選ぶ"
    },
    {
      name: "実践コース", 
      price: "98,000",
      duration: "12週間",
      description: "実践的な開発スキルまで身につけたい方向け",
      features: [
        "全モジュール（Module 01-04）",
        "オンライン動画講義",
        "実践プロジェクト",
        "コードレビュー",
        "質問サポート（平日・土日対応）",
        "6ヶ月間フォローアップ",
        "修了証明書"
      ],
      popular: true,
      buttonText: "実践コースを選ぶ"
    },
    {
      name: "プレミアムコース",
      price: "149,800", 
      duration: "12週間",
      description: "1対1指導で確実にスキルアップしたい方向け",
      features: [
        "全モジュール（Module 01-04）",
        "オンライン動画講義",
        "実践プロジェクト",
        "1対1メンタリング（月4回）",
        "コードレビュー",
        "24時間質問サポート",
        "キャリア相談",
        "12ヶ月間フォローアップ",
        "修了証明書"
      ],
      popular: false,
      buttonText: "プレミアムコースを選ぶ"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            料金プラン
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            あなたの学習目標に合わせて最適なプランをお選びいただけます
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    人気No.1
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ¥{plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            すべてのプランに30日間の返金保証付き
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>💳 クレジットカード決済</span>
            <span>🏦 銀行振込</span>
            <span>📱 分割払い対応</span>
          </div>
        </div>
      </div>
    </section>
  )
}