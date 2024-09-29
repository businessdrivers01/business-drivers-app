import React from 'react'
import { getCurrentAdmin } from '../../utils/getCurrentAdmin'
import { motion } from 'framer-motion'

function AdminDashboardDefault() {
    const date = new Date()
    const admin = getCurrentAdmin()

    const hours = date.getHours()
    const timeOfDay = hours < 12 ? 'morning' :
        hours < 18 ? 'afternoon' : 'evening'

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='md:text-6xl text-orange font-bold'>
            Hey <span className='text-darkBlue'>
                {admin?.username.split(" ")[0]}
            </span>,
            <br />it's good to see you on the {timeOfDay} of <span className="text-darkBlue">{month} {day}, {year}</span>.
        </motion.div>
    )
}

export default AdminDashboardDefault
