'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "プログラミング初心者でも受講できますか？",
      answer: "はい、大丈夫です。基礎コースではプログラミングの基本から丁寧に説明します。また、段階的なカリキュラムなので、初心者の方でも無理なく学習を進められます。"
    },
    {
      question: "Claude Codeのライセンスは含まれていますか？",
      answer: "いいえ、Claude Codeのライセンス費用は講座料金に含まれていません。別途Claude Codeのサブスクリプションが必要になります。講座では無料トライアルの活用方法もご説明します。"
    },
    {
      question: "どれくらいの学習時間が必要ですか？",
      answer: "週10-15時間程度の学習時間を想定しています。お仕事をされている方でも、平日1-2時間、週末にまとめて学習することで無理なく進められます。"
    },
    {
      question: "受講期間中にサポートは受けられますか？",
      answer: "はい。プランによって異なりますが、質問サポートやコードレビューなど充実したサポートを提供しています。プレミアムコースでは1対1のメンタリングも含まれます。"
    },
    {
      question: "修了後の就職・転職サポートはありますか？",
      answer: "修了生向けのキャリア相談を実施しています。履歴書の書き方、ポートフォリオ作成のアドバイス、面接対策などをサポートします。また、パートナー企業への紹介も行っています。"
    },
    {
      question: "返金保証はありますか？",
      answer: "はい、すべてのプランに30日間の返金保証がついています。講座開始から30日以内であれば、理由を問わず全額返金いたします。"
    },
    {
      question: "分割払いは可能ですか？",
      answer: "はい、クレジットカードでの分割払いに対応しています（3回、6回、12回）。詳細は申し込み時にご確認ください。"
    },
    {
      question: "講座はオンラインのみですか？",
      answer: "基本的にオンライン講座ですが、月1回程度オフラインでの勉強会も開催しています（東京・大阪）。参加は任意です。"
    },
    {
      question: "講座の録画動画は後から見返せますか？",
      answer: "はい。すべての講義動画は録画されており、受講期間中はいつでも見返すことができます。また、修了後6ヶ月間は動画にアクセス可能です。"
    },
    {
      question: "企業研修としても利用できますか？",
      answer: "はい、企業研修プランもご用意しています。チーム単位での受講割引や、カスタマイズされたカリキュラムも対応可能です。詳しくはお問い合わせください。"
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            よくある質問
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            受講を検討される方からよくいただく質問にお答えします
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg mb-4 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              その他のご質問
            </h3>
            <p className="text-gray-700 mb-6">
              上記以外でご不明な点がございましたら、
              お気軽にお問い合わせください
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              お問い合わせする
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}