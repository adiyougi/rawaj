import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export type ServiceCardData = {
  id:string;
  title:string;
  category:string;
  desc:string;
  image:string;
  badge:string;
};

export default function ServiceCard({item}:{item:ServiceCardData}) {
  return (
    <article className="shop-service-card">
      <Link href={"/services/"+item.id} className="shop-service-image" style={{backgroundImage:"url("+item.image+")"}}>
        {item.badge && <span className="shop-badge">{item.badge}</span>}
      </Link>
      <div className="shop-service-copy">
        <small>{item.category}</small>
        <Link href={"/services/"+item.id}><h3>{item.title}</h3></Link>
        <p>{item.desc}</p>
        <div className="shop-service-foot">
          <Link href={"/services/"+item.id}>التفاصيل</Link>
          <AddToCartButton id={item.id} title={item.title} compact />
        </div>
      </div>
    </article>
  );
}
