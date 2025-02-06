import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useContexts.jsx";
import PropTypes from "prop-types";
import Layout from "./components/Layout.jsx";
import Loading from "./components/Loading.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Rooms from "./pages/Rooms.jsx";
import Users from "./pages/Users.jsx";
import RoomEditor from "./components/RoomEditor.jsx";
import UserEditor from "./components/UserEditor.jsx";
import Bookings from "./pages/Bookings.jsx";
import BookingEditor from "./components/BookingEditor.jsx";

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuthContext();
  return (
    <div className="bg-surface-600 min-h-screen">
      <Toaster />
      <header>
        <Navbar />
      </header>
      <Layout />
      <main className="w-full md:p-10">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Protected Routes */}
            <Route
              path={"/"}
              element={
                <ProtectedRoute user={user}>
                  <Rooms />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/rooms"}
              element={
                <ProtectedRoute user={user}>
                  <Rooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rooms/update/:id"
              element={
                <ProtectedRoute user={user}>
                  <RoomEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rooms/create"
              element={
                <ProtectedRoute user={user}>
                  <RoomEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/rooms/book/:roomId"}
              element={
                <ProtectedRoute user={user}>
                  <BookingEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute user={user}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/update/:id"
              element={
                <ProtectedRoute user={user}>
                  <UserEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/create"
              element={
                <ProtectedRoute user={user}>
                  <UserEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute user={user}>
                  <Bookings />
                </ProtectedRoute>
              }
            />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/rooms" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/rooms" />}
            />

            {/* Catch-All */}
            <Route path="/*" element={<Login />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default App;
