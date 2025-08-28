import SectionHeading from '../ui/SectionHeading'
import Container from '../ui/Container'
import Card, { CardContent } from '../ui/Card'
import Badge from '../ui/Badge'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
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
      className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
    >
      ⭐
    </span>
  ))
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <Container>
        <SectionHeading
          title="受講生の声"
          subtitle="Claude Code講座を受講された方々からいただいたリアルな体験談をご紹介します"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-6">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                受講生満足度
              </h3>
              <p className="text-gray-600">
                2024年受講生アンケート結果（回答数: 324名）
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-6xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                  98%
                </div>
                <Badge variant="info" size="lg">総合満足度</Badge>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
                  95%
                </div>
                <Badge variant="success" size="lg">スキルアップ実感</Badge>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-4">
                  92%
                </div>
                <Badge variant="gradient" size="lg">転職・昇進成功</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}