import * as React from 'react';
import axios from '../../../utils/axiosConfig.js';

function useGradeReview() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [gradeTypes, setGradeTypes] = React.useState([]);
    const [reviews, setReviews] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(index)
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    const fetchData = () => {
        //fetch data
        setLoading(true);
        const getGradeTypes = async () => {
            const { success, data } = await axios.post(`/score/mock/grade-structure`, {
                teacherId: "",
                subjectId: "",
                semesterId: ""
            });
            if (data) {
                setGradeTypes(data)
                console.log(data)
                setLoading(false)
            }
        }
        getGradeTypes();
    }

    const getGradeReviews = async () => {//get reviews for curent grade type option
        //subjectId, teacherId, semesterId
        setLoading(true);
        const { success, data } = await axios.get(`/score/mock/reviews-requested`, {
            teacherId: "",//lam gi???
            subjectId: "",
            semesterId: ""
        });
        if (data) {
            setReviews(data)
            console.log(data)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    React.useEffect(() => {
        getGradeReviews()
    }, [selectedIndex])

    return {
        open,
        anchorRef,
        selectedIndex,
        gradeTypes,
        loading,
        reviews,
        handleClick,
        handleMenuItemClick,
        handleToggle,
        handleClose,
    };
}

export default useGradeReview;