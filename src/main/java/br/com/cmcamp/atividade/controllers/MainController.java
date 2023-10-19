package br.com.cmcamp.atividade.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping({"", "/"})
    public String goIndex(){

        return "index";
    }
}
