import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";

export default function Concurso1() {
  const slides = [
    {
      title: "Concrusante 1",
      image: "https://w7.pngwing.com/pngs/69/217/png-transparent-number-number-1-miscellaneous-angle-rectangle.png",
      subtitle: "This is the subtitle of Card 1",
      path: "/concurso1"
    },
    {
      title: "Concursante 2",
      image: "https://pngimg.com/uploads/number2/Number%202%20PNG%20images%20free%20download_PNG14925.png",
      subtitle: "This is the subtitle of Card 2"
    },
    {
      title: "Concursatne 3",
      image: "https://static.vecteezy.com/system/resources/previews/013/760/192/original/number-3-illustration-on-white-background-free-vector.jpg",
      subtitle: "This is the subtitle of Card 3"
    }
  ];
    return (
      <>
      <NavBar />
      <h1>texto</h1>
      <Carousel slides={slides}/>
      <Footer />
      </>
    )
  }
  