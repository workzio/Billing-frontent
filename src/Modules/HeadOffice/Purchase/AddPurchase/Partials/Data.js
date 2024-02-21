

const CategoryData = [{ label: 'All', value: 'all' }]


const GSTType = [
    {
        label: 'with Gst',
        value: 'with Gst'
    },
    {
        label: 'without Gst',
        value: 'without Gst'
    },
]

export const UserDAta = [
    {
        key: '1',
        phone_number: '1111111111',
        company_name:'aaaaaaaaaaaaaa',
        address:'fiugf  uhgsodf gdfhg og',
        
    },
    {
        key: '2',
        phone_number: '2222222222',
        company_name:'bbbbbbbbbbbbbb',
        address:'fiugf  uhgsodf gdfhg og',
        
    },
    {
        
        key: '3',
        phone_number: '333333333333333333',
        company_name:'cccccccccccccc',
        address:'fiugf  uhgsodf gdfhg og',
        
    }
]

const itemsData = [
    {
        label: 'Tilte',
        value: 'Tilte'
    },
    {
        label: 'BaeMent',
        value: 'BaeMent'
    },
    {
        label: 'WallHang',
        value: 'WallHang'
    },
]


export const ProductData = [
    {
        key: '1',
        category: 'Tilte',
        products:[
            {
                key:'1',
                name:'coco',
                hsncode:'HSN001',
            },
            
            {
                key:'2',
                name:'coco2',
                hsncode:'HSN002',
            },
            
            {
                key:'3',
                name:'coco3',
                hsncode:'HSN003',
            },
        ]
    },
    {
        key: '2',
        category: 'WallHang',
        products:[
            {
                key:'1',
                name:'BaseMent',
                hsncode:'HSNB001',
            },
            
            {
                key:'2',
                name:'BaseMent2',
                hsncode:'HSNB002',
            },
            
            {
                key:'3',
                name:'BaseMent3',
                hsncode:'HSNB003',
            },
        ]
    },
    {
        key: '3',
        category: 'bath',
        products:[
            {
                key:'1',
                name:'Bath',
                hsncode:'HSNWH001',
            },
            
            {
                key:'2',
                name:'Bath2',
                hsncode:'HSNWH002',
            },
            
            {
                key:'3',
                name:'Bath3',
                hsncode:'HSNWH003',
            },
        ]
    },
]
const TaxPercentage = [
    {
        label: 'IGST@0%',
        value: '0'
    },
    {
        label: 'GST@18%',
        value: '18'
    },
    {
        label: 'GST@28%',
        value: '28'
    },
    {
        label: 'GST@50%',
        value: '50'
    },
    {
        label: 'GST@0.5%',
        value: '0.5'
    },
]

export default {
    CategoryData,
    GSTType,
    itemsData,
    TaxPercentage
};
