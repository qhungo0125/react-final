import * as React from 'react';

function useGradeReview() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [gradeTypes, setGradeTypes] = React.useState([]);
    const [reviews, setReviews] = React.useState([])

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
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


    const getScoreTypes = async () => {
        setLoading(true);
        const { success, data } = await axios.post(`/score/mock/grade-structure`);
        if (data) {
            setGradeTypes(data)
            console.log(data)
            setLoading(false)
        }
    }

    const getGradeReviews = async () => {
        setLoading(true);
        const { success, data } = await axios.post(`/score/mock/reviews-requested`);
        if (data) {
            setGradeStructure(data)
            console.log(data)
            getRows(data)
            setLoading(false)
        }
    }


    return {
        open,
        anchorRef,
        selectedIndex,
        gradeTypes,
        handleClick,
        handleMenuItemClick,
        handleToggle,
        handleClose
    };
}

export default useGradeReview;