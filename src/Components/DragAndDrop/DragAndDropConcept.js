import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';


// BoxComponent for handling individual box
function BoxComponent({ id, position, width, content, customStyle }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });


  // Styling for the box
  const style = {
    position: 'absolute',
    left: `${position.x}px`, // Set x position in pixels
    top: `${position.y}px`, // Set y position in pixels
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    width: width,
    height: 'auto', // Allow height to adjust based on content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    gap: '20px',
    borderRadius: '8px',
    cursor: 'grab',
    textAlign: 'center',
    boxSizing: 'border-box',
    border: '1px solid black',
    ...customStyle, // Apply custom style if provided
  };


  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {content} {/* Render the dynamic content inside the box */}
    </div>
  );
}


function DragAndDropConcept() {
  const [boxes, setBoxes] = useState([
    { id: 1, x: 50, y: 20, width: '400px', title: 'Company details' },
    { id: 2, x: 50, y: 155, width: '400px', title: 'Supplier details' },
    { id: 3, x: 50, y: 280, width: '400px', title: 'Default details' },
    { id: 4, x: 50, y: 405, width: '400px', title: 'Custom details' },
    { id: 5, x: 50, y: 530, width: '80%', title: 'Item table' },
    { id: 6, x: 50, y: 625, width: '80%', title: 'Terms and conditions' },
  ]);


const handleDragEnd = (event) => {
  const { id } = event.active;
  const { delta } = event;


  setBoxes((prevBoxes) =>
    prevBoxes.map((box) => {
      if (box.id === parseInt(id)) {
        let newX = box.x + delta.x;
        let newY = box.y + delta.y;


        // Get the window width and height
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;


        // Set boundaries for the box (prevent going out of bounds)
        // For horizontal movement
        if (box.width !== '100%') {
          newX = Math.max(0, Math.min(newX, windowWidth - parseInt(box.width)));
        }


        // For vertical movement
        newY = Math.max(0, Math.min(newY, windowHeight - 100)); // 100px margin for the box height


        // For full-width boxes, keep them from moving horizontally
        if (box.width === '100%') {
          newX = 0; // Reset to left position for full-width boxes
        }


        return { ...box, x: newX, y: newY };
      }
      return box;
    })
  );
};




  // Example dynamic content for each box
  const dynamicContent = (boxId) => {
    switch (boxId) {
      case 1:
        return (
          <div style={{ textAlign: 'center',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <img src='https://marathon-web-assets.s3.ap-south-1.amazonaws.com/m-logo.svg'
            width='50px' height='50px'/>
            <span>Marathon</span>
            <address>Supplier Details</address>
           
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: 'left',display:'flex',flexDirection:'column',  paddingLeft: "20px", boxSizing: 'border-box' }}>
            <span>VENDOR DETAILS:</span>
            <span>Supplier name : abcd</span>
            <span>Supplier email : abcd@gmail.com</span>
            <span>Supplier pincode : 123456</span>
            <span>Supplier phone number : 1234567890</span>
           
          </div>
        );
      case 3:
        return (
          <div style={{ textAlign: 'left',display:'flex',flexDirection:'column',  paddingLeft: "20px", boxSizing: 'border-box'  }}>
            <span>Default details:</span>
            <span>Supplier name : abcd</span>
            <span>Supplier email : abcd@gmail.com</span>
            <span>Supplier pincode : 123456</span>
            <span>Supplier phone number : 1234567890</span>
           
          </div>
        );
      case 4:
        return (
          <div style={{ textAlign: 'left',display:'flex',flexDirection:'column', paddingLeft: "20px", boxSizing: 'border-box' }}>
            <span>Custom details:</span>
            <span>Supplier name : abcd</span>
            <span>Supplier email : abcd@gmail.com</span>
            <span>Supplier pincode : 123456</span>
            <span>Supplier phone number : 1234567890</span>
           
          </div>
        );
      case 5:
        return ( <div style={{ textAlign: 'left',display:'flex',flexDirection:'column',  paddingLeft: "20px", boxSizing: 'border-box'  }}>
          <span>Item table</span>
          <table>
        <thead>
            <tr>
                <th>Sr. No</th>
                <th>Part Number</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Cost Per Unit</th>
                <th>GST</th>
                <th>Total Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>PN12345</td>
                <td>Part A Description</td>
                <td>10</td>
                <td>50</td>
                <td>18%</td>
                <td>590</td>
            </tr>
           
           
        </tbody>
    </table>
   
         
        </div>);
      case 6:
        return (
          <div style={{ textAlign: 'left',display:'flex',flexDirection:'column',  paddingLeft: "20px", boxSizing: 'border-box'  }}>
            <span>Terms and conditions</span>
            <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
              sometimes by accident, sometimes on purpose (injected humour and the like).</span>
     
           
          </div>
        );
      default:
        return <span>No content available</span>;
    }
  };


  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflowX: 'hidden', boxSizing: 'border-box', padding: '240px' }}>
      <DndContext onDragEnd={handleDragEnd}>
        {boxes.map((box) => (
          <BoxComponent
            key={box.id}
            id={box.id.toString()}
            position={{ x: box.x, y: box.y }}
            width={box.width}
            content={dynamicContent(box.id)} // Render dynamic content based on box id
            customStyle={box.id === 1 ? { backgroundColor: 'white', color: '#000'} : {}} // Apply custom styles for specific box
          />
        ))}
      </DndContext>
    </div>
  );
}


export default DragAndDropConcept;





