package com.easybusiness.action;

import org.springframework.stereotype.Component;

import com.opensymphony.xwork2.ActionSupport;

@Component
public class LoginAction extends ActionSupport {

    private static final long serialVersionUID = 1L;
    private String userName;
    private String password;

    public String getUserName() {
	return userName;
    }

    public String getPassword() {
	return password;
    }

    public LoginAction() {
	super();
    }

    public String execute() {
	return SUCCESS;
    }

}
