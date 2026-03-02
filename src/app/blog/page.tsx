import { redirect } from "next/navigation";
import { getFirstPage } from "@/src/lib/blogData";

export default function BlogIndexPage() {
   redirect(getFirstPage());
}
