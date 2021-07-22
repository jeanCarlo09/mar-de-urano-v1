import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addActiveCategory, removeActiveCategory } from '../../redux/actions/blogActions';
import { navigate } from 'gatsby';

export const CheckCategorie = ({ category, isChecked }) => {

    const dispatch = useDispatch();
    const [checkedState, setCheckedState] = useState(isChecked);


    const click = () => {

        (checkedState) ? dispatch(removeActiveCategory(category.handle)) : dispatch(addActiveCategory(category.handle));

        setCheckedState(!checkedState);

        if (window.location.search != '') {
            navigate('/blog');
        }
    }

    return (
        <>
            <input type="checkbox" checked={checkedState} onChange={click} />
            <button onClick={click}>
                {category.title} <span>{category.blog_post.length}</span>
            </button>
        </>
    );

}