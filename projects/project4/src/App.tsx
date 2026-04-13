import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/common/layouts/MainLayout";
import MainPage from "@/features/main/pages/MainPage";
import FittingRoom from "@/features/fittingroom/pages/FittingRoom";
import RecommendPage from "@/features/recommend/pages/RecommendPage";
import HotItemsPage from "@/features/hotitems/pages/HotItemsPage";
import SearchResultPage from "@/features/search/pages/SearchResultPage";
import ImageSearchPage from "@/features/imagesearch/pages/ImageSearchPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="main" replace />} />
        <Route path="main" element={<MainPage />} />
        <Route path="fittingroom" element={<FittingRoom />} />
        <Route path="search" element={<SearchResultPage />} />
        <Route path="image-search" element={<ImageSearchPage />} />
        <Route path="recommend" element={<RecommendPage />} />
        <Route path="hotitems" element={<HotItemsPage />} />
        <Route path="HotItems" element={<HotItemsPage />} />
        <Route path="login" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

