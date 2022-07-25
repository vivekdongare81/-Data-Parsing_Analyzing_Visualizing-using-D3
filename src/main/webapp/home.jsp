<%@page import="java.util.Arrays"%> <%@ page language="java"
contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Raleway"
    />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

    <style>
      body,
      h1,
      h5 {
        font-family: "Raleway", sans-serif;
      }
      body,
      html {
        height: 100%;
      }
      .bgimg {
        background: linear-gradient(
            60deg,
            rgba(0, 0, 0, 0.9),
            rgba(0, 0, 0, 0.6)
          ),
          url("https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
        min-height: 100%;
        background-position: center;
        background-size: cover;
        position: static;
        filter: blur(8px);
        -webkit-filter: blur(2px);
      }

      .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 2px;
      }
      .tooltip {
        position: absolute;
        text-align: center;
        min-width: 60px;
        min-height: 28px;
        padding: 2px;
        font: 12px sans-serif;
        background: rgb(0, 0, 0);
        border: 0px;
        border-radius: 8px;
        pointer-events: none;
        z-index: 10;
        color: white;
      }
      .one {
        font-size: 25px;
      }
      .container p {
        display: inline;
      }
    </style>
  </head>

  <body>
    <div class="bgimg w3-display-container w3-text-white"></div>
    <div id="chartArea" class="w3-display-middle w3-jumbo">
      <p
        style="
          color: white;
          font-size: 30px;
          text-align: center;
          margin-top: 150px;
        "
      >
        <% String str[] = (String[]) request.getAttribute("xArray"); String str2
        = (String) request.getAttribute("yArray"); String str3 = (String)
        request.getAttribute("Funcc"); %> <%-- x= <%=
        Arrays.toString(str).substring(1,Arrays.toString(str).length()-1) %> y=
        <%= (str2) %> funcc = <%= (str3) %> --%>
      </p>
    </div>

    <div class="w3-display-topleft w3-container w3-xlarge mt-4">
      <form id="myForm" action="HomeGetServelet" method="POST">
        <div
          class="container"
          style="width: 4000px; margin: auto; text-align: center"
          style="font-size: 15px"
        >
          <p class="mt-4">
            <button class="w3-black">Group By</button>
            <select
              name="xAxis"
              size="3"
              multiple="multiple"
              tabindex="1"
              class="selectpicker"
              data-live-search="true"
            >
              <option value="Order Date">By Year</option>
              <option value="Order Date-M">By Month</option>
              <option value="Ship Mode">Ship Mode</option>
              <option value="Segment">Type of Customer</option>
              <option value="Category">Category</option>
              <option value="Sub-Category">Sub Category</option>
              <option value="Country">Country</option>
              <option value="Region">Region</option>
              <option value="State">State</option>
              <option value="City">City</option>
            </select>
          </p>
          <p class="mt-4">
            <button class="w3-black">Function</button>
            <select name="Func" class="selectpicker" data-live-search="true">
              <option value="sum">Aggregate</option>
              <option value="count">Count</option>
              <option value="mean">Average</option>
            </select>
          </p>
          <p class="mt-4">
            <button class="w3-black">to get</button>
            <select name="yAxis" class="selectpicker" data-live-search="true">
              <option value="Sales">Sales</option>

              <option value="Customer ID">Customer</option>
              <option value="Segment">Type of Customer</option>
              <option value="Product ID">Products</option>
              <option value="Order ID">Orders</option>
              <option value="Country">Country</option>
              <option value="State">State</option>
              <option value="City">City</option>
              <option value="Category">Category</option>
              <option value="Sub-Category">Sub Category</option>
            </select>
          </p>
          <p class="mt-4 m-4">
            <button style="margin: 20px" class="w3-black">Chart Type</button>
            <select
              name="chartType"
              class="selectpicker"
              data-live-search="true"
            >
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </p>
        </div>
        <button type="submit" class="btn btn-primary">Compute</button>
      </form>
    </div>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="./d3.js"></script>
    <script type="text/javascript">
         console.log("hello")

         <%
         if( request.getAttribute("xArray")!=null && request.getAttribute("yArray")!=null){ %>
      	var x_JsArray =""+"<%= Arrays.toString( (String[]) request.getAttribute("xArray"))%>";
      	var y_JsArray =""+"<%=  request.getAttribute("yArray") %>";
      	var Func =""+"<%=  request.getAttribute("Funcc") %>";
      	var chartType =""+"<%=  request.getAttribute("chartType") %>";
      	x_JsArray = x_JsArray.slice(1,-1).split(',');
      	for(var i=0;i<x_JsArray.length;i++){
      		x_JsArray[i]=x_JsArray[i].trim();
      	}
      	run();
      <% }
         %>
    </script>

    <script type="text/javascript" src="salesData.json"></script>
  </body>
</html>
