const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get the data
d3.json(url).then(function(data) {
                    
});

// Initiate the function
function init(){
// Use D3 to select the dropdown menu 
// Assign the value of the dropdown menu option to a variable
let dropdownMenu = d3.select("#selDataset");
d3.json(url).then((data) => {
let sampleID =data.names; 
// Log the value of id for each iteration of the loop
sampleID.forEach((id) => {
dropdownMenu.append("option").attr("value",id).text(id);
                 }); 
// First entry of the sample                 
let first_entry = sampleID[0];
console.log(first_entry)

// Make the base plots
makeBar(first_entry);
makeBubble(first_entry);
makeDemographics(first_entry);
});
};



// Make a Sample Bar PLot
function makeBar(sample){
// use d3 to get data
d3.json(url).then(function(data) {
// filter data to get id
let sample_data =data.samples;
// apply a filter that matches based on sample id
let results = sample_data.filter(sampled => sampled.id == sample);

// First entry
let my_sample = results[0];
console.log(sample_data)
// Values of otu_ids, otu_labels, sample_values
let otu_ids = my_sample.otu_ids;
let otu_labels = my_sample.otu_labels;
let sample_values = my_sample.sample_values;
// Log the data to the console
console.log(otu_ids,otu_labels,sample_values);
// Slice the first 10 enteries
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
// Establish Trace 1       
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

};



function makeBubble(sample){
// use D3 to get data
d3.json(url).then((data) => {
// / filter data to get id
let sample_data =data.samples;
let results = sample_data.filter(sampled => sampled.id == sample);
// First result
let my_sample = results[0];

// Values of otu_ids, otu_labels, sample_values
let otu_ids = my_sample.otu_ids;
let otu_labels = my_sample.otu_labels;
let sample_values = my_sample.sample_values;            
  
// // Bubble Chart
let xticks = otu_ids.reverse();
let yticks = sample_values.reverse();
let text = otu_labels.reverse();
let marker = otu_ids;
// Establish Trace 2
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




// Make Demographic window
function makeDemographics(sample){
d3.json(url).then((data) => {
 // filter data to get id
let sample_metadata =data.metadata;
console.log(sample_metadata);
                    // apply a filter that matches based on sample id
                    let results = sample_metadata.filter(sampled => sampled.id == sample);
                    // First entry
                    let my_sample_metadata = results[0];
                    console.log(my_sample_metadata);
//clear out previous entries in the demographic info 
d3.select('#sample-metadata').text('');
  
Object.entries(my_sample_metadata).forEach(([key, value]) => {
      console.log(key, value);
 
d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`); });


})};

// function to update dashboard with changing values
function optionChanged() {
  let newsample = d3.select("#selDataset").property("value");
  console.log(newsample)
  makeBar(newsample)
  makeBubble(newsample)
  makeDemographics(newsample)
};
init()

