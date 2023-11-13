interface NewsItemProps {
    item: {
        id: string
        title: string
        image: string
        content: string
    }
}

export default function NewsItem({item}: NewsItemProps) {
    return (
        <div className="news-item">
            <img src={item.image} className="news-item-image" alt={item.title} />
            <h2 className="news-item-title">{item.title}</h2>
            <p className="news-item-content">{item.content}</p>
        </div>
    )
}