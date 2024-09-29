import { motion } from "framer-motion";
import { MyButton } from "../../Components"

export default function PendingApproval() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-white flex items-center justify-center"
        >
            <div className="text-center p-6 max-w-lg mx-auto">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                    className="text-4xl font-bold text-darkBlue"
                >
                    Hold Tight!
                </motion.h1>

                <motion.p
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 50 }}
                    className="text-lg text-darkBlue mt-4"
                >
                    Your account is under review and will be approved soon in next 24 hours. We appreciate your patience!
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-8"
                >
                    <span className="block w-16 h-16 mx-auto border-4 border-t-transparent border-orange rounded-full animate-spin"></span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="text-md text-darkBlue mt-6"
                >
                    Meanwhile, feel free to explore our platform or come back later for updates.
                </motion.p>

                <a href="https://businessDrivers01.com">
                    <MyButton
                        className="mt-4 py-4 hover:text-orange font-bold"
                        children="Explore Business Drivers"
                    />
                </a>

            </div>
        </motion.div>
    );
}
