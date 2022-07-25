

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;




@WebServlet("/home")
public class HomeGetServelet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public HomeGetServelet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
 	

	       response.sendRedirect("home.jsp");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		
		String[] x = request.getParameterValues("xAxis");
		String y = request.getParameter("yAxis");
		String Func = request.getParameter("Func");
		String chartType =  request.getParameter("chartType");
		request.setAttribute("xArray",x);
		request.setAttribute("yArray",y);
		request.setAttribute("Funcc",Func);
		request.setAttribute("chartType",chartType);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("home.jsp");
		dispatcher.forward(request,response);
		
		
	}

}
