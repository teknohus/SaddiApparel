import mongose from 'mongoose'

const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI)
        const conn = await mongose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: `)
    } catch (error) {
      console.error("Error: ${error.message}")
            process.exit(1)
    }
}

export default connectDB