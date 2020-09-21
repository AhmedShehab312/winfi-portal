import { PropTypes, func } from "prop-types";
import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './DropDownStyle.scss';
const DropDown = ({ label, items, selctedItem, onClick }) => {
    return (
        <UncontrolledDropdown className="UncontrolledDropdownContainer">
            <DropdownToggle caret nav>
                {selctedItem ? selctedItem.name : label}
                <i className="fas fa-caret-down"></i>
            </DropdownToggle>
            <DropdownMenu>
                {
                    items.map((Item, key) => {
                        return <DropdownItem key={key} onClick={() => { onClick(Item) }} active={selctedItem && Item.id == selctedItem.id}>{Item.name}</DropdownItem>
                    })
                }
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

DropDown.defaultProps = {
    label: "",
    items: null,
    selctedItem: null,
    onClick: null
};

DropDown.propTypes = {
    label: PropTypes.string,
    items: PropTypes.array,
    selctedItem: PropTypes.object,
    onClick: func


};

export { DropDown };
