import NewsItem from "./NewsItem"

interface NewsItemsProps {
    data: {
        id: string
        title: string
        image: string
        content: string
    }[]
}
export default function NewsItems({data}: NewsItemsProps) {
    return (
        <div className="news-items">
            {data.map((item) => (
                <NewsItem key={item.id} item={item} />
            ))}
        </div>
    )
}