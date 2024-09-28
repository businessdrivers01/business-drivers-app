import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import { Layout, Home, ContactUs } from '../Components'
import { LoginPage, SignupPage, FreelancerDashboard, JobsPage, FreelancerDashboardDefault, NotFound, ErrorBoundary, CompanyDashboard, FreelancerProfilePage, CompanyProfilePage, CompanyDashboardDefault, PostJobPage, JobsPosted, BlogPage, FreeCoursesPage, PrivacyPolicyPage, TermsOfServicesPage } from '../Pages'
import { CompanyProtectedRoute, FreelancerProtectedRoute } from '../Components'






export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Normal Routes with ErrorBoundary */}
            <Route path="/" element={
                <ErrorBoundary>
                    <Layout />
                </ErrorBoundary>
            } errorElement={<ErrorBoundary />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* just to Add NavLink isActive state separately on Find Work and Find Job NavItems */}
                <Route path="/signup-freelancer" element={<SignupPage />} />

                <Route path="/blogs" element={<BlogPage />} />
                <Route path="/free-courses" element={<FreeCoursesPage />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicesPage />} />
                <Route path="/*" element={<NotFound />} />
            </Route>

            {/* Protected Routes for Freelancer */}
            <Route path="/freelancer-dashboard" element={
                <ErrorBoundary>
                    <FreelancerProtectedRoute>
                        <FreelancerDashboard />
                    </FreelancerProtectedRoute>
                </ErrorBoundary>
            } errorElement={<ErrorBoundary />}>
                <Route index element={<FreelancerDashboardDefault />} />
                <Route path="/freelancer-dashboard/profile" element={<FreelancerProfilePage />} />
                <Route path="/freelancer-dashboard/jobs" element={<JobsPage />} />

            </Route>

            {/* Protected Routes for Company */}
            <Route path="/company-dashboard" element={
                <ErrorBoundary>
                    <CompanyProtectedRoute>
                        <CompanyDashboard />
                    </CompanyProtectedRoute>
                </ErrorBoundary>
            }>
                <Route index element={<CompanyDashboardDefault />} />
                <Route path="/company-dashboard/profile" element={<CompanyProfilePage />} />
                <Route path="/company-dashboard/post-job" element={<PostJobPage />} />
                <Route path="/company-dashboard/jobs-posted" element={<JobsPosted />} />

            </Route>



        </>
    )
);