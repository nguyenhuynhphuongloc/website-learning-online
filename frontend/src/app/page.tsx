"use client";

import LoginPage from "@/app/pages/LoginPage/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResultPage from "@/app/pages/LibraryTestPage/ResultPage/page";
import LiveLessonPage from "@/app/pages/LiveLessionPage/page";
import ReadingTestDetail from "@/app/pages/LibraryTestPage/Reading/ReadingTestDetail/page";
import WritingTestDetail from "@/app/pages/LibraryTestPage/Writing/WritingTestDetail/page";
import DetailLession from "@/app/pages/LiveLessionPage/DetailLesson/page";
import Wallet from "@/app/pages/WalletPage/page";
import PaymentPage from "@/app/pages/PaymentPage/page";
import RegisterPage from "@/app/pages/RegisterPage/page";
import MasterClass from "./pages/MasterClassPage/page";
import Homepage from "@/app/pages/HomePage/page";
import AdminPage from "@/app/pages/AdminPage/page";
import LibraryWritingTest from "@/app/pages/LibraryTestPage/Writing/page";
import LibraryListeningTest from "@/app/pages/LibraryTestPage/Listening/page";
import LibraryReadingTest from "@/app/pages/LibraryTestPage/Reading/page";
import ListeningTestDetail from "@/app/pages/LibraryTestPage/Listening/ListeningTestDetail/page";

export default function App() {
  return (
    <div className="h-screen">

      <BrowserRouter>

        <Routes>
          <Route path="/pages/HomePage" element={<Homepage />} />

          <Route path="/pages/LoginPage" element={<LoginPage />} />

          <Route path="/pages/RegisterPage" element={<RegisterPage />} />

          <Route path="/pages/LibraryTestPage/Listening/ListeningTestDetail" element={< ListeningTestDetail />} />

          <Route path="/pages/LibraryTestPage/ResultPage" element={< ResultPage />} />

          <Route path="/pages/AdminPage" element={< AdminPage />} />

          <Route path="/pages/LiveLessionPage" element={<LiveLessonPage />} />

          <Route path="/pages/LibraryTestPage/Listening" element={<LibraryListeningTest />} />

          <Route path="/pages/LibraryTestPage/Reading" element={<LibraryReadingTest />} />

          <Route path="/pages/LibraryTestPage/Writing" element={<LibraryWritingTest />} />

          <Route path="/pages/LibraryTestPage/Reading/ReadingTestDetail" element={<ReadingTestDetail />} />

          <Route path="/pages/LibraryTestPage/Writing/WritingTestDetail" element={< WritingTestDetail />} />

          <Route path="/pages/LiveLession/DetailLesson" element={<DetailLession />} />

          <Route path="/pages/WaletPage" element={<Wallet />} />

          <Route path="/pages/PaymentPage" element={<PaymentPage />} />

          <Route path="/pages/MasterClassPage" element={< MasterClass />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
}
