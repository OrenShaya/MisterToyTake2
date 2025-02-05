import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    function formatDate(date) {
        console.log('day:', date.getDate(), new Date().getDate())
        console.log('year:', date.getFullYear(), new Date().getFullYear())
        console.log('month:', date.getMonth(), new Date().getMonth())
        
        // same day
        if (date.getDate() === new Date().getDate() && 
            date.getMonth() === new Date().getMonth() && 
            date.getFullYear() === new Date().getFullYear()) 
        { 
            return `today, ${date.getHours()}:${date.getMinutes()}`
        }
        if (date.getFullYear < new Date().getFullYear() || // bigger year
              (date.getFullYear() === new Date().getFullYear() && // or
              date.getMonth() !== new Date().getMonth()) || //different month
              (Math.abs(date.getDate() - new Date().getDate()) < 7 &&
              date.getFullYear() === new Date().getFullYear() && 
              date.getMonth() === new Date().getMonth())) // more than a week
        {
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        }
        const day = date.getDay()
        switch (day) {
            case 0:
                return 'Sunday'
            case 1:
                return 'Monday'
            case 2:
                return 'Tuesday'
            case 3:
                return 'Wednesday'
            case 4:
                return 'Thursday'
            case 5:
                return 'Friday'
            case 6:
                return 'Saturday'
        }
    }

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>🎁</h1>
            <p>Price: <span>₪{toy.price}</span></p>
            <p>in stock: <span>{toy.inStock}</span></p>
            <ul className="toy-labels">
                {toy.labels.map(((label, idx) => {
                    return <li key={`${toy._id}-${idx}`} className="toy-label">{label}</li>
                }))}
            </ul>
            <p>Arrived: 
            <span> {formatDate(toy.createdAt)} </span> </p>
            
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}