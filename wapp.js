var body = document.getElementsByTagName("body");
var header = document.createElement("h1");
var nav = document.createElement("div");
var displayStatus = document.createElement("div");
var search = document.createElement("input");
var select1 = document.createElement("select");
var select2 = document.createElement("select");
var container = document.createElement('div');
var map = document.createElement('div');
var km2 = "\u33A2";
var orderedBy ="ORDERED BY: "
var showedRegion ="SHOWED REGION: "
map.id="map"
nav.id="nav"
container.id="container"
displayStatus.id="displayStatus"
search.id="search"
select1.id="sortby"
select2.id="byregion"
search.type="search";
search.placeholder="Search name...";
header.innerHTML="Countries / Territories /Areas";
var sortValue = "Name"
var sortRegion = "All"


var sortbyvalues = ["Area", "Name","Population","Sort by"];
var byregion = ["All","Africa","Americas","Asia","Europe","Oceania","Polar","By Region"]
for (var i = 0 ; i < sortbyvalues.length;i++){
    var option = document.createElement("option");
    option.label=sortbyvalues[i];
    option.value=sortbyvalues[i];
    if (sortbyvalues[i] == "Sort by"){
        option.selected = true;
        option.hidden = true;
    }
    select1.appendChild(option);
}
for (var i = 0 ; i < byregion.length;i++){
    var option = document.createElement("option");
    option.label=byregion[i];
    option.value=byregion[i];
    if (byregion[i] == "By Region"){
        option.selected = true;
        option.hidden = true;
    }
    select2.appendChild(option);
}

function close(){
    map.innerHTML=""
    var g = document.getElementById("map")
    g.style.zIndex=0;
}

var closeMap = document.createElement('button')
closeMap.className="closeMap"
closeMap.innerHTML="Close"
closeMap.addEventListener('click',close)

function changeMap(a,b,area){
    map.innerHTML=""
    map.appendChild(closeMap)
    var g = document.getElementById("map")
    g.style.zIndex=2;
    var gmap = new ol.Map({
         target: 'map',
         layers: [
         new ol.layer.Tile({
         source: new ol.source.OSM()
         })
         ],
         view: new ol.View({
         center: ol.proj.fromLonLat([a, b]),
         zoom: (11 - (Math.log10((area)/(16-Math.log10(area)))))
         })
         });
    }


nav.appendChild(search);
nav.appendChild(select1)
nav.appendChild(select2)
nav.appendChild(displayStatus)
body[0].appendChild(map)
body[0].appendChild(header);
body[0].appendChild(nav);
body[0].appendChild(container)


var country;
var tempcountry;


var info=["Population: ","Area: ","Region: ","Subregion: ","Lat ","Long ","Code: ","Calling Code: "]

fetch ('https://restcountries.com/v2/all')
.then(res => {if (res.status == 200){res.text().then(data=>{country = JSON.parse(data) 
    tempcountry = country.slice()
    for (var i = 0;i<country.length;i++){
        
        var mapButton = document.createElement('button')
        mapButton.className="mapButton"
        mapButton.innerHTML="Map"
        var data = document.createElement('div');
        data.className="data";
        var flagSection = document.createElement('div');
        flagSection.className="flagSection";
        var nameSection = document.createElement('div');
        nameSection.className="nameSection";
        var populationSection = document.createElement('div');
        populationSection.className="populationSection";
        var areaSection = document.createElement('div');
        areaSection.className="areaSection";
        var regionSection = document.createElement('div');
        regionSection.className="regionSection";
        var subRegionSection = document.createElement('div');
        subRegionSection.className="subRegionSection";
        var latLongMapSection = document.createElement('div');
        latLongMapSection.className="latLongMapSection";
        var latHidden = document.createElement('div');
        latHidden.className="latHidden";
        var longHidden = document.createElement('div');
        longHidden.className="longHidden";
        var areaHidden = document.createElement('div');
        areaHidden.className="areaHidden";
        var codeSection = document.createElement('div');
        codeSection.className="codeSection";
        var flag = document.createElement('img')
        flag.className="flag"
        flag.src=country[i].flag;
        nameSection.innerHTML=(country[i].name).bold();
        populationSection.innerHTML=info[0].bold()+country[i].population
        if (country[i].hasOwnProperty("area")){areaSection.innerHTML=info[1].bold()+country[i].area+" "+km2
        areaHidden.innerHTML = country[i].area
    
        }else{areaSection.innerHTML=info[1].bold()+"Not given"
        areaHidden.innerHTML = 1}
        regionSection.innerHTML=info[2].bold()+country[i].region
        subRegionSection.innerHTML=info[3].bold()+country[i].subregion
        if (country[i].hasOwnProperty("latlng")){latLongMapSection.innerHTML=info[4].bold()+country[i].latlng[0]+" "+info[5].bold()+country[i].latlng[1]
        latLongMapSection.appendChild(mapButton)
        latHidden.innerHTML = country[i].latlng[0]
        longHidden.innerHTML = country[i].latlng[1]
        latLongMapSection.appendChild(latHidden)
        latLongMapSection.appendChild(longHidden)
        latLongMapSection.appendChild(areaHidden)
        
        
         }else{latLongMapSection.innerHTML=info[4].bold()+"Not given "+info[5].bold()+"Not given"}
        mapButton.addEventListener('click',function(){changeMap(parseFloat(this.nextElementSibling.nextElementSibling.innerHTML),parseFloat(this.nextElementSibling.innerHTML,10),this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)})
        codeSection.innerHTML=info[6].bold()+country[i].alpha3Code+" "+info[7].bold()+country[i].callingCodes[0]
        flagSection.appendChild(flag)
        data.appendChild(flagSection)
        data.appendChild(nameSection)
        data.appendChild(populationSection)
        data.appendChild(areaSection)
        data.appendChild(regionSection)
        data.appendChild(subRegionSection)
        data.appendChild(latLongMapSection)
        data.appendChild(codeSection)
        container.appendChild(data);
        
        } displayStatus.innerHTML=orderedBy+sortValue.bold()+"    "+showedRegion+sortRegion.bold()} )}})

    function sortbySelect(){
        var value = document.getElementById("sortby").value;
        if (value == "Name"){
            sortValue="Name"
            tempcountry.sort(function(a,b){if(a.name < b.name){ return -1}else{return 1}})
        }
        if (value == "Population"){
            sortValue="Population"
            tempcountry.sort((a,b) => {if (a.population > b.population){return -1}else{return 1}})
        }
        if (value == "Area"){
            sortValue="Area"
            tempcountry.sort(function(a,b){
                if ( (typeof (a.area) == "undefined") || (typeof (b.area) == "undefined") ){
                    if (typeof(a.area) == "undefined"){
                        return 1
                    }else{
                        return -1
                    }
                }else{
                    if (a.area < b.area){
                        return 1
                    }else{
                        return -1
                    }
                }
            }
            )
        }

        var containerNodes = document.getElementById("container")
        while (containerNodes.hasChildNodes()){
            containerNodes.removeChild(containerNodes.lastChild)
        }
        for (var i = 0;i<tempcountry.length;i++){
            var mapButton = document.createElement('button')
            mapButton.className="mapButton"
            mapButton.innerHTML="Map"
            var data = document.createElement('div');
            data.className="data";
            var flagSection = document.createElement('div');
            flagSection.className="flagSection";
            var nameSection = document.createElement('div');
            nameSection.className="nameSection";
            var populationSection = document.createElement('div');
            populationSection.className="populationSection";
            var areaSection = document.createElement('div');
            areaSection.className="areaSection";
            var regionSection = document.createElement('div');
            regionSection.className="regionSection";
            var subRegionSection = document.createElement('div');
            subRegionSection.className="subRegionSection";
            var latLongMapSection = document.createElement('div');
            latLongMapSection.className="latLongMapSection";
            var latHidden = document.createElement('div');
            latHidden.className="latHidden";
            var longHidden = document.createElement('div');
            longHidden.className="longHidden";
            var areaHidden = document.createElement('div');
            areaHidden.className="areaHidden";
            var codeSection = document.createElement('div');
            codeSection.className="codeSection";
            var flag = document.createElement('img')
            flag.className="flag"
            flag.src=tempcountry[i].flag;
            nameSection.innerHTML=(tempcountry[i].name).bold();
            populationSection.innerHTML=info[0].bold()+tempcountry[i].population
            if (tempcountry[i].hasOwnProperty("area")){areaSection.innerHTML=info[1].bold()+tempcountry[i].area+" "+km2
            areaHidden.innerHTML = tempcountry[i].area
        
            }else{areaSection.innerHTML=info[1].bold()+"Not given"
            areaHidden.innerHTML = 1}
            regionSection.innerHTML=info[2].bold()+tempcountry[i].region
            subRegionSection.innerHTML=info[3].bold()+tempcountry[i].subregion
            if (tempcountry[i].hasOwnProperty("latlng")){latLongMapSection.innerHTML=info[4].bold()+tempcountry[i].latlng[0]+" "+info[5].bold()+tempcountry[i].latlng[1]
            latLongMapSection.appendChild(mapButton)
            latHidden.innerHTML = tempcountry[i].latlng[0]
            longHidden.innerHTML = tempcountry[i].latlng[1]
            latLongMapSection.appendChild(latHidden)
            latLongMapSection.appendChild(longHidden)
            latLongMapSection.appendChild(areaHidden)
             }else{latLongMapSection.innerHTML=info[4].bold()+"Not given "+info[5].bold()+"Not given"}
            mapButton.addEventListener('click',function(){changeMap(parseFloat(this.nextElementSibling.nextElementSibling.innerHTML),parseFloat(this.nextElementSibling.innerHTML,10),this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)})
            codeSection.innerHTML=info[6].bold()+tempcountry[i].alpha3Code+" "+info[7].bold()+tempcountry[i].callingCodes[0]
            flagSection.appendChild(flag)
            data.appendChild(flagSection)
            data.appendChild(nameSection)
            data.appendChild(populationSection)
            data.appendChild(areaSection)
            data.appendChild(regionSection)
            data.appendChild(subRegionSection)
            data.appendChild(latLongMapSection)
            data.appendChild(codeSection)
            container.appendChild(data);
            }displayStatus.innerHTML=orderedBy+sortValue.bold()+"    "+showedRegion+sortRegion.bold()
    }

    function sortbyRegion(){
        tempcountry=country.slice()
        var p = tempcountry.length;
        var n = 0
        var m = 0
        var value = document.getElementById("byregion").value;
        if (value != "All"){
            sortRegion = value;
            while (n < p){
                if (tempcountry[m].region != value){tempcountry.splice(m,1)}else{m++}n++;
            }
        }else{
            sortRegion="All"
        }
    
        if (sortValue == "Name"){tempcountry.sort(function(a,b){if(a.name < b.name){ return -1}else{return 1}})}
        if (sortValue == "Population"){tempcountry.sort((a,b) => {if (a.population > b.population){return -1}else{return 1}})}
        if (sortValue == "Area"){
            tempcountry.sort(function(a,b){
                if ( (typeof (a.area) == "undefined") || (typeof (b.area) == "undefined") ){
                    if (typeof(a.area) == "undefined"){
                        return 1
                    }else{
                        return -1
                    }
                }else{
                    if (a.area < b.area){
                        return 1
                    }else{
                        return -1
                    }
                }
            }
            )
        }

        var containerNodes = document.getElementById("container")
        while (containerNodes.hasChildNodes()){
            containerNodes.removeChild(containerNodes.lastChild)
        }
        for (var i = 0;i<tempcountry.length;i++){
            var mapButton = document.createElement('button')
            mapButton.className="mapButton"
            mapButton.innerHTML="Map"
            var data = document.createElement('div');
            data.className="data";
            var flagSection = document.createElement('div');
            flagSection.className="flagSection";
            var nameSection = document.createElement('div');
            nameSection.className="nameSection";
            var populationSection = document.createElement('div');
            populationSection.className="populationSection";
            var areaSection = document.createElement('div');
            areaSection.className="areaSection";
            var regionSection = document.createElement('div');
            regionSection.className="regionSection";
            var subRegionSection = document.createElement('div');
            subRegionSection.className="subRegionSection";
            var latLongMapSection = document.createElement('div');
            latLongMapSection.className="latLongMapSection";
            var latHidden = document.createElement('div');
            latHidden.className="latHidden";
            var longHidden = document.createElement('div');
            longHidden.className="longHidden";
            var areaHidden = document.createElement('div');
            areaHidden.className="areaHidden";
            var codeSection = document.createElement('div');
            codeSection.className="codeSection";
            var flag = document.createElement('img')
            flag.className="flag"
            flag.src=tempcountry[i].flag;
            nameSection.innerHTML=(tempcountry[i].name).bold();
            populationSection.innerHTML=info[0].bold()+tempcountry[i].population
            if (tempcountry[i].hasOwnProperty("area")){areaSection.innerHTML=info[1].bold()+tempcountry[i].area+" "+km2
            areaHidden.innerHTML = tempcountry[i].area
        
            }else{areaSection.innerHTML=info[1].bold()+"Not given"
            areaHidden.innerHTML = 1}
            regionSection.innerHTML=info[2].bold()+tempcountry[i].region
            subRegionSection.innerHTML=info[3].bold()+tempcountry[i].subregion
            if (tempcountry[i].hasOwnProperty("latlng")){latLongMapSection.innerHTML=info[4].bold()+tempcountry[i].latlng[0]+" "+info[5].bold()+tempcountry[i].latlng[1]
            latLongMapSection.appendChild(mapButton)
            latHidden.innerHTML = tempcountry[i].latlng[0]
            longHidden.innerHTML = tempcountry[i].latlng[1]
            latLongMapSection.appendChild(latHidden)
            latLongMapSection.appendChild(longHidden)
            latLongMapSection.appendChild(areaHidden)
             }else{latLongMapSection.innerHTML=info[4].bold()+"Not given "+info[5].bold()+"Not given"}
            mapButton.addEventListener('click',function(){changeMap(parseFloat(this.nextElementSibling.nextElementSibling.innerHTML),parseFloat(this.nextElementSibling.innerHTML,10),this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)})
            codeSection.innerHTML=info[6].bold()+tempcountry[i].alpha3Code+" "+info[7].bold()+tempcountry[i].callingCodes[0]
            flagSection.appendChild(flag)
            data.appendChild(flagSection)
            data.appendChild(nameSection)
            data.appendChild(populationSection)
            data.appendChild(areaSection)
            data.appendChild(regionSection)
            data.appendChild(subRegionSection)
            data.appendChild(latLongMapSection)
            data.appendChild(codeSection)
            container.appendChild(data);
            }displayStatus.innerHTML=orderedBy+sortValue.bold()+"    "+showedRegion+sortRegion.bold()
    }

    function onSearch(){
        var tempcountry2 = tempcountry.slice()
        var p = tempcountry2.length;
        var hidden1 = document.getElementById("byregion")
        var hidden2 = document.getElementById("sortby")
        var str1 ="SEARCH RESULTS: "
        var str =" MATCHES"
        var n = 0
        var m = 0
        var input = document.getElementById("search").value
            
            while (n < p){
                if (!(tempcountry2[m].name).includes(input)){tempcountry2.splice(m,1) }else{m++}n++;
            }
            if (input == ""){
                hidden1.style.visibility="visible"
                hidden2.style.visibility="visible"
                displayStatus.innerHTML=orderedBy+sortValue.bold()+"    "+showedRegion+sortRegion.bold()
            }else{
                hidden1.style.visibility="hidden"
                hidden2.style.visibility="hidden"
                displayStatus.innerHTML=str1+tempcountry2.length+str
            }
            
    
            var containerNodes = document.getElementById("container")
            while (containerNodes.hasChildNodes()){
                containerNodes.removeChild(containerNodes.lastChild)
            }
            for (var i = 0;i<tempcountry2.length;i++){
                var mapButton = document.createElement('button')
                mapButton.className="mapButton"
                mapButton.innerHTML="Map"
                var data = document.createElement('div');
                data.className="data";
                var flagSection = document.createElement('div');
                flagSection.className="flagSection";
                var nameSection = document.createElement('div');
                nameSection.className="nameSection";
                var populationSection = document.createElement('div');
                populationSection.className="populationSection";
                var areaSection = document.createElement('div');
                areaSection.className="areaSection";
                var regionSection = document.createElement('div');
                regionSection.className="regionSection";
                var subRegionSection = document.createElement('div');
                subRegionSection.className="subRegionSection";
                var latLongMapSection = document.createElement('div');
                latLongMapSection.className="latLongMapSection";
                var latHidden = document.createElement('div');
                latHidden.className="latHidden";
                var longHidden = document.createElement('div');
                longHidden.className="longHidden";
                var areaHidden = document.createElement('div');
                areaHidden.className="areaHidden";
                var codeSection = document.createElement('div');
                codeSection.className="codeSection";
                var flag = document.createElement('img')
                flag.className="flag"
                flag.src=tempcountry2[i].flag;
                nameSection.innerHTML=(tempcountry2[i].name).bold();
                populationSection.innerHTML=info[0].bold()+tempcountry2[i].population
                if (tempcountry2[i].hasOwnProperty("area")){areaSection.innerHTML=info[1].bold()+tempcountry2[i].area+" "+km2
                areaHidden.innerHTML = tempcountry2[i].area
            
                }else{areaSection.innerHTML=info[1].bold()+"Not given"
                areaHidden.innerHTML = 1}
                regionSection.innerHTML=info[2].bold()+tempcountry2[i].region
                subRegionSection.innerHTML=info[3].bold()+tempcountry2[i].subregion
                if (tempcountry2[i].hasOwnProperty("latlng")){latLongMapSection.innerHTML=info[4].bold()+tempcountry2[i].latlng[0]+" "+info[5].bold()+tempcountry2[i].latlng[1]
                latLongMapSection.appendChild(mapButton)
                latHidden.innerHTML = tempcountry2[i].latlng[0]
                longHidden.innerHTML = tempcountry2[i].latlng[1]
                latLongMapSection.appendChild(latHidden)
                latLongMapSection.appendChild(longHidden)
                latLongMapSection.appendChild(areaHidden)
                 }else{latLongMapSection.innerHTML=info[4].bold()+"Not given "+info[5].bold()+"Not given"}
                mapButton.addEventListener('click',function(){changeMap(parseFloat(this.nextElementSibling.nextElementSibling.innerHTML),parseFloat(this.nextElementSibling.innerHTML,10),this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML)})
                codeSection.innerHTML=info[6].bold()+tempcountry2[i].alpha3Code+" "+info[7].bold()+tempcountry2[i].callingCodes[0]
                flagSection.appendChild(flag)
                data.appendChild(flagSection)
                data.appendChild(nameSection)
                data.appendChild(populationSection)
                data.appendChild(areaSection)
                data.appendChild(regionSection)
                data.appendChild(subRegionSection)
                data.appendChild(latLongMapSection)
                data.appendChild(codeSection)
                container.appendChild(data);
                }
        }
    
        


    
    select1.addEventListener('change',sortbySelect);
    select2.addEventListener('change',sortbyRegion);
    search.addEventListener('search',onSearch);



