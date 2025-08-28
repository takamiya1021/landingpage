'use client'

import SectionHeading from '../ui/SectionHeading'
import Container from '../ui/Container'
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

interface Plan {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  popular: boolean
  color: string
}

const plans: Plan[] = [
  {
    name: "基礎コース",
    price: "49,800",
    duration: "6週間",
    description: "Claude Codeの基本操作を学びたい方向け",
    color: "from-gray-600 to-gray-800",
    features: [
      "基礎モジュール（Module 01-02）",
      "オンライン動画講義",
      "課題フィードバック",
      "質問サポート（平日対応）",
      "修了証明書"
    ],
    popular: false
  },
  {
    name: "実践コース", 
    price: "98,000",
    duration: "12週間",
    description: "実践的な開発スキルまで身につけたい方向け",
    color: "from-blue-600 to-purple-600",
    features: [
      "全モジュール（Module 01-04）",
      "オンライン動画講義",
      "実践プロジェクト",
      "コードレビュー",
      "質問サポート（平日・土日対応）",
      "6ヶ月間フォローアップ",
      "修了証明書"
    ],
    popular: true
  },
  {
    name: "プレミアムコース",
    price: "149,800", 
    duration: "12週間",
    description: "1対1指導で確実にスキルアップしたい方向け",
    color: "from-purple-600 to-pink-600",
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
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <Container>
        <SectionHeading
          title="料金プラン"
          subtitle="あなたの学習目標に合わせて最適なプランをお選びいただけます"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'ring-4 ring-blue-500 ring-opacity-50 transform scale-105 z-10' 
                  : 'hover:scale-105'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3">
                  <Badge variant="gradient" className="bg-white/20">
                    🎉 人気No.1
                  </Badge>
                </div>
              )}
              
              <CardHeader className={plan.popular ? "pt-16" : "pt-8"}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                      ¥{plan.price}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">/ {plan.duration}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  variant={plan.popular ? 'primary' : 'secondary'}
                  className="w-full"
                  size="lg"
                >
                  {plan.popular ? '🚀' : '📝'} このプランを選ぶ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Guarantee and Payment Info */}
        <Card className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              安心の30日間返金保証
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              すべてのプランに30日間の返金保証付き。講座内容にご満足いただけない場合は、理由を問わず全額返金いたします。
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💳</span>
                <span>クレジットカード決済</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏦</span>
                <span>銀行振込</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span>分割払い対応</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}