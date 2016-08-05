ProcessDocument = app.trustedFunction(function()
{
    // create a new document
    app.beginPriv();
    var newDoc = app.newDoc();
    app.endPriv();

    // get the filename of our current file

    var i = 0;
    while (i < this.numPages)
    {
        newDoc.insertPages( {
            nPage: newDoc.numPages-1,
            cPath: this.path,
            nStart: i
        });
        newDoc.insertPages( {
            nPage: newDoc.numPages-1,
            cPath: this.path,
            nStart: i
        });
        // we did this twice so that we can then split each copy of the page into a left
        // and right half. 
        i++;
    }

    if (newDoc.numPages > 1)
    {
        newDoc.deletePages(0);	// this gets rid of the page that was created with the newDoc call.
    }

    // at this point we have a documnent with every page from the source document
    // copied twice


    for (i=0; i<newDoc.numPages; i++)
    {
        // determine the crop box of the page
        var cropRect = newDoc.getPageBox("Crop", i);
        var halfWidth = (cropRect[2]-cropRect[0])/2;

        var cropLeft = new Array();
        cropLeft[0] = cropRect[0];
        cropLeft[1] = cropRect[1];
        cropLeft[2] = cropRect[0] + halfWidth;
        cropLeft[3] = cropRect[3];

        var cropRight = new Array();
        cropRight[0] = cropRect[2] - halfWidth;
        cropRight[1] = cropRect[1];
        cropRight[2] = cropRect[2];
        cropRight[3] = cropRect[3];

        if (i%2 == 0)
        {
	   newDoc.setPageBoxes( {
	       cBox: "Crop",
	       nStart: i,
	       rBox: cropLeft
	       });
        }
        else
        {
	   newDoc.setPageBoxes( {
	       cBox: "Crop",
	       nStart: i,
	       rBox: cropRight
	       });
        }
    }
}
)




// add the menu item
app.addMenuItem({
     cName: "splitPagesJS",     // this is the internal name used for this menu item
     cUser: "Split Pages",       // this is the label that is used to display the menu item
     cParent: "Document",              // this is the parent menu. The file menu would use "File"
     cExec: "ProcessDocument()",  // this is the JavaScript code to execute when this menu item is selected
     cEnable: "event.rc = (event.target != null);",       // when should this menu item be active?
     nPos: 0
});

