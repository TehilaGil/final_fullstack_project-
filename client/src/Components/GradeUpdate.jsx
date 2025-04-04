
import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { AutoComplete } from "primereact/autocomplete";




const UpdateGrade = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
     const items = ['first grade','second grade','third grade','fourth grade','fifth grade','sixth grade','seventh grade','eighth grade'];

    const [filteredItems, setFilteredItems] = useState(null);

    const { updateGrade } = props
    const { visible } = props


    const nameRef = useRef("")
    const imageRef = useRef("")


    const searchItems = (event) => {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo purposes we filter at client side
        // let query = event.query;
        // let _filteredItems = [];

        setFilteredItems(items);
    }



    return (


        <Dialog
            visible={visible}
            modal
            onHide={() => { if (!visible) return; props.setVisible(false); }}
            content={({ hide }) => (
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="Gradename" className="text-primary-50 font-semibold">
                            name
                        </label>
                        <AutoComplete value={selectedItem} suggestions={filteredItems} completeMethod={searchItems}
                            virtualScrollerOptions={{ itemSize: 38 }}  dropdown onChange={(e) => setSelectedItem(e.value)} />
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="Postname" className="text-primary-50 font-semibold">
                            image
                        </label>
                        <InputText id="name" label="name" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="name" ref={imageRef} defaultValue={props.grade.image}></InputText>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="Update" onClick={(e) => { updateGrade(nameRef, imageRef); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
            )}
        ></Dialog>

    )
}
export default UpdateGrade