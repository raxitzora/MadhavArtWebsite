import GalleryHeroComp from "../../components/GalleryPageComponents/GalleryHeroComp"
import GalleryImages from "../../components/GalleryPageComponents/GalleryImages"

const GalleryPage = () => {
  return (
    <main className="pt-[72px]">
      <GalleryHeroComp />
      <GalleryImages />
    </main>
  )
}

export default GalleryPage