    "use client"
    import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

    export default function LC(){

    const [name1,setName1] = useState("")
    const [name2,setName2] = useState("")
    const [result,setResult] = useState(null)

    const percentageCalcluater=async()=>{

        if(!name1 || !name2) return
        
        let x = name1.toLowerCase().replace(/\s/g,"")
        let y = name2.toLowerCase().replace(/\s/g,"")
    if(
            (x === "likitha" && y === "jagadeesh") ||
            (x === "jagadeesh" && y === "likitha")
        ){
            setResult({ percentage: 0, status: "Not Applicable" })
            return
        }
        let a = x.split("")
        let b = y.split("")

        for(let i=0;i<a.length;i++){
            let index  = b.indexOf(a[i])
            if(index !== -1){
                a[i]= null
                b[index]=null
            }
        }

        let count = a.filter(v=>v!==null).length + 
                    b.filter(v=>v!==null).length

        let percentage = count * 10

        let status = ""

        if(percentage <= 10) status = "💔 Breakup"
        else if(percentage <= 30) status = "🙂 Friends"
        else if(percentage <= 50) status = "😎 Best Friends"
        else if(percentage <= 70) status = "❤️ Love"
        else status = "💍 Marriage"

        setResult({percentage,status})
        await fetch("/api/save",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name1,
            name2,
            percentage,
            status
        })
    })
    }

    return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-red-200 to-rose-300 p-6">

        <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-6">

            <h1 className="text-3xl font-bold text-center text-rose-700">
                💖 Valentine Calculator 💖
            </h1>

            <input
                placeholder="Enter Name 1"
                value={name1}
                onChange={(e)=>setName1(e.target.value)}
                className="p-3 rounded-xl outline-none border focus:ring-2 focus:ring-pink-400"
            />

            <input
                placeholder="Enter Name 2"
                value={name2}
                onChange={(e)=>setName2(e.target.value)}
                className="p-3 rounded-xl outline-none border focus:ring-2 focus:ring-pink-400"
            />

            <button
                onClick={percentageCalcluater}
                style={{cursor:"pointer"}}
                className="bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-semibold transition duration-300 "
            >
                Check Your Status 💌
            </button>

            <AnimatePresence>
{result && (
    <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-4 p-6 bg-white rounded-xl shadow-lg"
    >
        <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-rose-600"
        >
            {result.percentage}%
        </motion.h2>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg mt-2 font-semibold text-gray-700"
        >
            {result.status}
        </motion.p>
    </motion.div>
)}
</AnimatePresence>
        </div>

    </div>
    )
    }
