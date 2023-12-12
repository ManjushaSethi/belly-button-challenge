const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Drop down function
d3.json(url).then(function(data) {
                    
});


function init(){
// Use D3 to select the dropdown menu
let dropdownMenu = d3.select("#selDataset");
// Assign the value of the dropdown menu option to a variable
// let dataset = dropdownMenu.property("value");
d3.json(url).then((data) => {
let sampleID =data.names; 

sampleID.forEach((id) => {
// Log the value of id for each iteration of the loop
  
dropdownMenu.append("option").attr("value",id).text(id);
                });  
let first_entry = sampleID[0];


makeBar(first_entry);
makeBubble(first_entry);
makeDemographics(first_entry);
});
};
// // function optionChanged() {
// //                     let newsample = d3.select("#selDataset").property("value");
// //                     console.log(newsample);
                    
//                     // let vals = []
//                     // vals = Object.values(data[newval])
//                     // console.log(data[newval])
//                     // Plotly.restyle("bar", "values", [vals]);
                    
//                     // let IDSel = d3.select("#selDataset")
//                     // IDSel.on("change",optionChanged)
// // Fetch new data each time a new sample is selected
// // buildCharts(value);
// // buildMetadata(value);

                  

//                     }});
init()


// Make a Sample Bar PLot
function makeBar(sample){

d3.json(url).then(function(data) {
// filter data to get id
let sample_data =data.samples;
// apply a filter that matches based on sample id
let results = sample_data.filter(sampled => sampled.id == sample);

// First entry
let my_sample = results[0];
console.log(sample_data)

let otu_ids = my_sample.otu_ids;
let otu_labels = my_sample.otu_labels;
let sample_values = my_sample.sample_values;
// Log the data to the console

// Slice the first 10 enteries
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        let trace1 = {
                    x: xticks,
                    y: yticks,
                    text: labels,
                    name: "Samples",
                    type: "bar",
                    orientation: "h"
                  };

// Apply a title to the layout
let layout_1 = {
  title: "Top Ten OTUs",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
}; 
Plotly.newPlot("bar", [trace1], layout_1);
});
}
function optionChanged() {
                    let newsample = d3.select("#selDataset").property("value");
                    console.log(newsample)
                    makeBar(newsample)
}



function makeBubble(sample){
d3.json(url).then((data) => {
// / filter data to get id
let sample_data =data.samples;
let results = sample_data.filter(sampled => sampled.id == sample);

let my_sample = results[0];


let otu_ids = my_sample.otu_ids;
let otu_labels = my_sample.otu_labels;
let sample_values = my_sample.sample_values;            
  
// // Bubble Chart
let xticks = otu_ids.reverse();
let yticks = sample_values.reverse();
let text = otu_labels.reverse();
let marker = otu_ids;

 var trace2 = {
                    x: xticks,
                    y: yticks,
                    text:text,
                    mode: 'markers',
                     marker: {
                       color: otu_ids,
                      size: sample_values
                   }
                  };
                  
      var layout = {
                    title: 'Bacteria Count',
                    xaxis: {title: "OTU ID"},
                    yaxis: {title: "Number of Bacteria"}
                    
                  };
                  
                  Plotly.newPlot('bubble', [trace2], layout);
});

};
function optionChanged() {
                    let newsample = d3.select("#selDataset").property("value");
                    console.log(newsample)
                    makeBar(newsample)
}



// Make Demographic window
function makeDemographics(metadata){
d3.json(url).then((data) => {
 // filter data to get id
let sample_metadata =data.metadata;
console.log(sample_metadata);
                    // apply a filter that matches based on sample id
                    let results = sample_metadata.filter(sampled => sampled.id == metadata);
                    // First entry
                    let my_sample_metadata = results[0];
                    console.log(my_sample_metadata);

                  
                   
                  
                    // Iterate over the metadata properties and create paragraphs
                    for (let key in metadata) {
                      if (metadata.hasOwnProperty(key)) {
                        let paragraph = document.createElement("p");
                        paragraph.textContent = `${key}: ${metadata[key]}`;
                        metadataContainer.appendChild(paragraph);
                      }
                    }
                  
                  
                  // Call the function with the sample metadata
                  makeDemographics(sample_metadata)

})};

