"use client"
import { useParams } from 'next/navigation'


export default function DetailsPage() {
    const {id}=useParams()
  return (
    <div>DetailsPage-{id}</div>
  )
}
