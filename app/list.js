/**
 * アプリケーションのデータ定義
 * - id: 一意の識別子（kebab-case）
 * - title: 表示用タイトル
 * - url: 環境別のURL（local/global）
 * - public: 公開状態フラグ
 */
const productsData = {
    products: [
        {
            id: 'rium',
            title: 'Rium',
            url: {
                local: '',
                global: 'https://rium.io'
            },
            public: true
        },
        {
            id: 'vibe-products',
            title: 'Vibe Products',
            url: {
                local: '',
                global: 'https://vibe-products.vercel.app'
            },
            public: true
        },
        {
            id: 'block-away',
            title: 'Block Away',
            url: {
                local: './games/block-away',
                global: ''
            },
            public: true
        },
        {
            id: 'color-block',
            title: 'Color Block',
            url: {
                local: './games/color-block',
                global: ''
            },
            public: true
        },
        {
            id: 'cube-away',
            title: 'Cube Away',
            url: {
                local: './games/cube-away',
                global: 'https://vibe-products-docs.web.app/'
            },
            public: true
        },
        {
            id: 'qrcode',
            title: 'QR Code',
            url: {
                local: './tools/qrcode-generator',
                global: ''
            },
            public: true
        },
        {
            id: 'metaverse',
            title: 'Metaverse Media',
            url: {
                local: './sites/metaverse',
                global: ''
            },
            public: true
        },
        {
            id: 'aoi-ai-tech-blog',
            title: 'Aoi AI Tech Blog',
            url: {
                local: 'http://172.22.157.213:3000',
                global: 'http://172.22.157.213:3000'
            },
            public: true
        }
    ]
};