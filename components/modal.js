import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
import {hideModal,hideShowParam} from '../action/modal';
import ListParam from './listParam';
import ReadMore from './readMore';
import {createSelectorDivided,hideShowSelector} from '../selectors';


function Modal(props){

   const {hideModal,context,id,labels,data,checkboxHideShow,hideShowParam} = props;
   let modalRef = React.createRef();
   function handleKeyUp(e){
        const keys = {
            27: () => {
                e.preventDefault();
                hideModal()
                window.addEventListener('keyup', handleKeyUp, false);
            }
        }
        if (keys[e.keyCode]) {keys[e.keyCode]()}
   }

   function outSideClick(e){
        if(!isNil(modalRef.current)){
            if(!modalRef.current.contains(e.target)){
                hideModal();
                document.addEventListener('click', outSideClick, false);
            }
        }
    }

    useEffect(()=>{
        window.addEventListener('keyup', handleKeyUp, false);
        document.addEventListener('click', outSideClick, false);
        return ()=>{
            window.removeEventListener('keyup', handleKeyUp, false);
	        document.removeEventListener('click', outSideClick, false);
        }
    })
    return(
        <div className="modalOverlay">
            <div 
                className="modal"
                ref={modalRef}>
                <div id="popup-ext" className="popup-close" onClick={hideModal}></div>
                    {context}
                    { id ?        
                        <ReadMore 
                            data={data} 
                            tarifId={id} 
                            labels={labels}
                            />
                        : 
                        <React.Fragment>
                        <ListParam
                            checkboxHideShow={checkboxHideShow}
                            hideShowParam={hideShowParam}
                        />
                        </React.Fragment>            
                    }
                </div>
            </div>
        )
}

Modal.propTypes = {
    data: PropTypes.array.isRequired,
    labels: PropTypes.object.isRequired,
    checkboxHideShow: PropTypes.array.isRequired,
    hideModal: PropTypes.func.isRequired,
    hideShowParam: PropTypes.func.isRequired
}

export default connect((state) =>({
    id: state.modal.get('id'),
    data: createSelectorDivided(state).data,
    checkboxHideShow: hideShowSelector(state),
    labels: state.data.labels,
}),{hideModal,hideShowParam})(Modal);