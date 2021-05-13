What libraries did you add to the frontend? What are they used for?
- I added axios to make get, post and delete request.
What's the command to start the application locally?
- backend: python manage.py runserver
- frontend: npm start
How long did you spend on the coding project? What would you add to your solution if you had more time? If you didn't spend much time on the coding project, then use this as an opportunity to explain what you would add.
- I spend 2 days to build the project but I was sick and had limited time so I could not spend whole 2 days.
What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
- I used react hooks (it is not for the language but I think framework feature also appropriate), it makes easy to manage states. This code snippet lists all courses and delete selected one. Also filters courses on the table.

const [courses, setCourses] = useState([])
    const [search, setSearch] = useState("")
    const [filteredCourses, setFilteredCourses] = useState([])

    // load courses
    useEffect(() => {
        const loadCourses = async () => {
            axiosInstance.get('/course')
            .then((res) => {
                console.log(res)
                setCourses(res.data)
            }).catch((err) => {
                if(err.response.status === 401){
                    window.location.href = '/admin/login'
                }
            })
        }
        loadCourses()
    }, [])

const deleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            axiosInstance.delete(`/course/delete/${id}`)
            .then((res) => {
                alert('Course deleted!')
            }).catch((err) => {
                alert('Something went wrong!')
            })
            setCourses(courses.filter((c) => c.id !== id));
        }
    }

    // filter courses on the table
    useEffect(() => {
        setFilteredCourses(
            courses.filter((course) => {
                return (
                    course.name.toLowerCase().includes(search.toLowerCase()) ||
                    course.description.toLowerCase().includes(search.toLowerCase()) ||
                    course.price.toString().toLowerCase().includes(search.toLowerCase())
                    )
            })
        )
    }, [search, courses])

How would you track down a performance issue in production? Have you ever had to do this?

I didn't face performans issue but I find problems by 
Page rendering time
Total time spent to view data
CPU and Memory usage
