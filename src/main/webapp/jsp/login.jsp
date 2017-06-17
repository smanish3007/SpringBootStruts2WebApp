<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>


<html>
<head>
<title>User Management</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<style>
.separator {
	height: 10px;
}
</style>

<script type="text/javascript">
	function docSubmit() {
		var test_id = document.getElementById('test_id1').value;
		var can_name = document.getElementById('can_name1').value;

		if (document.pressed == 'Find') {

			document.studentResult.action = "findStudent.action?test_id="
					+ test_id + "&can_name=" + can_name;

		} else if (document.pressed == 'Next') {
			document.studentResult.action = "showAnswer";
		}

		document.forms["studentResult"].action = "findStudent.action?test_id="
				+ test_id + "&can_name=" + can_name;

		document.forms["studentResult"].submit();
	}
</script>


</head>


<body>



	<p />



	<!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->












	<div class="container text-center">

		<h2>User Management</h2>


		<div class="row">
			<div class="col-sm-4"></div>
			<div class="col-sm-3"></div>
			<div class="col-sm-9"></div>
		</div>

		<div class="row">

			<div class="col-sm-4">
				<img src="<s:url value="/images/User.png"/>" class="img-circle" />
			</div>
			<div class="table-responsive">
				<table class="table table-bordered">
					<tbody>
						<tr>
							<td>
								<div class="col-sm-3">

									<img src="<s:url value="/images/LoginRed.jpg"/>"
										class="img-circle" />

								</div>







								<div class="col-sm-9">


									<s:form cssClass="form-horizontal" name="login" id="login"
										action="login">
										<p>
											<em>Please Login!</em>
										</p>
										<div class="form-group">
											<label class="control-label col-sm-2" for="username">UserName:</label>
											<div class="col-sm-10">
												<input type="text" class="form-control" id="userName"
													name="userName" placeholder="Enter UserName">
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="password">Password:</label>
											<div class="col-sm-10">
												<input type="password" class="form-control" id="password"
													name="password" placeholder="Enter Password">
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-offset-2 col-sm-10">
												<div class="checkbox">
													<label><input type="checkbox"> Remember me</label>
												</div>
											</div>
										</div>
										<div class="form-group">
											<div class="col-sm-offset-2 col-sm-10">
												&nbsp&nbsp<button type="submit" class="btn btn-primary">Login</button>
											
											&nbsp&nbsp
												<button type="submit" class="btn btn-danger">Forgot Password</button>
											</div>
										</div>
									</s:form>

								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
	</div>








	<!--  -->



	</div>
</body>
</html>