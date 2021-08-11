
import React, { useEffect, useState } from 'react';
import CollectionDescriptionSticky from '../../wrappers/collection/CollectionDescriptionSticky';
import CollectionList from './CollectionList';


const CollectionSection = ({ collectionDetail }) => {

    const [client, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    return (
        <>
            {client && ((collectionDetail)
                ? <CollectionDescriptionSticky></CollectionDescriptionSticky>
                : <CollectionList></CollectionList>)
            }
        </>
    );
}

export default CollectionSection;